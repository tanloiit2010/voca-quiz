import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

export const QUERY_QUIZ_SESSION = "QUERY_QUIZ_SESSION";

const fetchQuizSession =  async ({ queryKey }: { queryKey: any[] }) => {
  const [_key, quizId] = queryKey

  const response = await axios.get<{
    data: QuizSession
  }>(`/api/quizzes/${quizId}/quiz-sessions`)

  return response.data.data
};

const useQueryQuizSession = (quizId: string, onSuccess: (data: QuizSession) => void) => {
  return useQuery({
    queryKey: [QUERY_QUIZ_SESSION, quizId],
    queryFn: fetchQuizSession,
    enabled: !!quizId,
    onSuccess
  });
};

export default useQueryQuizSession;
