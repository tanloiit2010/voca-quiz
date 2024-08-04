export const QUEUE_NAME = {
  QUIZ: 'quiz',
};

export const JOB_NAME = {
  USER_ANSWER_EVALUATED: 'user_answer_evaluated',
};

export const EVENT_NAME = {
  LEADER_BOARD_UPDATED: 'leaderBoardUpdated',
  USER_ANSWER_EVALUATED: 'userAnswerEvaluated',
};

export type UserAnswerEvaluatedJobData = {
  id: number;
  questionId: number;
  selectedOptionId: number;
  correctOptionId: number;
  quizSessionId: number;
  username: string;
  newScore: number;
};
