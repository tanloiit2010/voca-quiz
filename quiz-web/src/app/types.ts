type LeaderBoardUser = {
  username: string
  score: number
}

type UserAnswer = {
  id: number
  questionId: number
  selectedOptionId: number
  correctOptionId: number
}

type QuestionOption = {
  id: number
  content: string
  displayOrder: number
}

type Question = {
  id: number
  content: string
  type: "single_choice" | "multiple_choice" | "true_false"
  score: number
  displayOrder: number
  questionOptions: QuestionOption[]
}

type Quiz = {
  id: number
  name: string
  description: string
  questions: Question[]
}

type QuizSession = {
  id: number
  username: string
  startedAt: Date
  status: "completed" | "in-progress"
  score: number
  createdDate: Date
  updatedDate: Date
  quiz: Quiz
}

type UserAnswerEvaluatedEventData = {
  id: number;
  questionId: number;
  selectedOptionId: number;
  correctOptionId: number;
  quizSessionId: number;
  username: string;
  newScore: number;
};

type LeaderBoardUpdatedEventData = {
  quizSessionId: number
}
