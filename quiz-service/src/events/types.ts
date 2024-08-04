export const QUEUE_NAME = {
  QUIZ: 'quiz',
};

export const JOB_NAME = {
  USER_ANSWERED: 'user_answered',
  USER_ANSWER_EVALUATED: 'user_answer_evaluated',
};

export type UserAnsweredJobData = {
  userAnswerId: number;
};

export type UserAnswerEvaluatedJobData = {
  userAnswerId: number;
};
