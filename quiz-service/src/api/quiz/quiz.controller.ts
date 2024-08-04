import {
  Controller,
  Res,
  Logger,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { QuizContext } from 'src/core/quiz/quiz.context';
import { SubmitUserAnswerRequestDto } from 'src/core/quiz/types';
import { ScoreContext } from 'src/core/score/score.context';

@Controller('/api/quizzes')
export class QuizController {
  readonly logger: Logger = new Logger(QuizController.name);

  constructor(
    private readonly quizContext: QuizContext,
    private readonly scoreContext: ScoreContext,
  ) {}

  @Get('/:id/quiz-sessions')
  @UseGuards(AuthGuard)
  async getQuizSession(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const quizSession = await this.quizContext.getQuizSession(
      req.user.username,
      id,
    );
    return res.status(200).json({
      data: quizSession,
    });
  }

  @Get(':id/leaderboard')
  @UseGuards(AuthGuard)
  async getLeaderBoard(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const leaderBoard = await this.scoreContext.getLeaderBoard(id);

    return res.status(200).json({
      data: leaderBoard,
    });
  }

  @Get('quiz-sessions/:id/user-answers')
  @UseGuards(AuthGuard)
  async getUserAnswers(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const quizSession = await this.quizContext.getUserAnswers(
      req.user.username,
      id,
    );
    return res.status(200).json({
      data: quizSession,
    });
  }

  @Post('quiz-sessions/:id/questions/:questionId/user-answers')
  @UseGuards(AuthGuard)
  async submitUserAnswer(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: number,
    @Param('questionId') questionId: number,
    @Body() body: SubmitUserAnswerRequestDto,
  ) {
    const userAnswer = await this.quizContext.answerQuestion(
      req.user.username,
      id,
      questionId,
      body.questionOptionId,
    );

    return res.status(200).json({
      data: userAnswer,
    });
  }
}
