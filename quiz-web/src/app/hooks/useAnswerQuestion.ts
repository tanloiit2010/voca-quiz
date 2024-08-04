import { useMutation } from "@tanstack/react-query";
import axios from "../axios";

const onMutate = async (params: {
  questionSessionId: number
  questionId: number
  questionOptionId: number
}) => {
  const { questionSessionId, questionId, questionOptionId } = params;

  return await axios.post(`/api/quizzes/quiz-sessions/${questionSessionId}/questions/${questionId}/user-answers`, {
    questionOptionId
  });
};

const useAnswerQuestion = () => {
  return useMutation(onMutate);
};

export default useAnswerQuestion;
