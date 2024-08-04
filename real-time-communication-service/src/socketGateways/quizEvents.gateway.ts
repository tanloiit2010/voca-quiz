import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';
import { EVENT_NAME, UserAnswerEvaluatedJobData } from 'src/events/types';
import { JoinQuzSessionDto } from 'src/types';

@WebSocketGateway(8001, { cors: '*' })
export class QuizEventsGateway {
  readonly logger: Logger = new Logger(QuizEventsGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinQuizSession')
  @UseGuards(AuthGuard)
  joinQuizSession(
    @MessageBody() data: JoinQuzSessionDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log('====> joinQuizSession:', data);

    this.logger.log('====> join Room:', `quiz_session_${data.quizSessionId}`);
    this.logger.log('====> join Room:', `user_${client.data.user.username}`);
    client.join(`quiz_session_${data.quizSessionId}`);
    client.join(`user_${client.data.user.username}`);
  }

  async emitLeaderBoardUpdated(quizSessionId: number) {
    this.logger.log(
      '====> emitLeaderBoardUpdated to room:',
      `quiz_session_${quizSessionId}`,
    );
    this.server
      .to(`quiz_session_${quizSessionId}`)
      .emit(EVENT_NAME.LEADER_BOARD_UPDATED, {
        quizSessionId,
      });
  }

  async emitUserAnswerEvaluated(data: UserAnswerEvaluatedJobData) {
    this.logger.log(
      '====> emitUserAnswerEvaluated to room:',
      `user_${data.username}`,
    );
    this.server
      .to(`user_${data.username}`)
      .emit(EVENT_NAME.USER_ANSWER_EVALUATED, data);
  }
}
