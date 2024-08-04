import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

export const QUERY_USER_ANSWERS = "QUERY_USER_ANSWERS";

const fetchUserAnswers =  async ({ queryKey }: { queryKey: any[] }) => {
  const [_key, quizSessionId] = queryKey

  const response = await axios.get<{
    data: UserAnswer[]
  }>(`/api/quizzes/quiz-sessions/${quizSessionId}/user-answers`)

  return response.data.data
};

const useQueryUserAnswers = (quizSessionId?: number) => {
  return useQuery({
    queryKey: [QUERY_USER_ANSWERS, quizSessionId],
    queryFn: fetchUserAnswers,
    enabled: !!quizSessionId
  });
};

export default useQueryUserAnswers;
