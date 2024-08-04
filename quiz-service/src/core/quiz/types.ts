import { IsNotEmpty } from 'class-validator';

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SINGLE_CHOICE: 'single_choice',
};

export const QUIZ_SESSION_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export type UserAnswerResponseDto = {
  id: number;
  questionId: number;
  selectedOptionId: number;
  correctOptionId: number;
};

export class SubmitUserAnswerRequestDto {
  @IsNotEmpty()
  questionOptionId: number;
}

export const CACHE_KEYS = {
  LEADERBOARD: 'leaderboard',
};
