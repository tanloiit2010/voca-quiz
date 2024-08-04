import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';
import { Socket } from 'socket.io';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = this.extractTokenFromHeader(client);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      client.data.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] =
      client.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
