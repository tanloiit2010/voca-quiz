import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

export const QUERY_QUIZ_LEADER_BOARD = "QUERY_QUIZ_LEADER_BOARD";

const fetchQuizLeaderBoard =  async ({ queryKey }: { queryKey: any[] }) => {
  const [_key, quizId] = queryKey

  const response = await axios.get<{
    data: LeaderBoardUser[]
  }>(`/api/quizzes/${quizId}/leaderboard`)

  return response.data.data
};

const useQueryQuizLeaderBoard = (quizId: string) => {
  return useQuery({
    queryKey: [QUERY_QUIZ_LEADER_BOARD, quizId],
    queryFn: fetchQuizLeaderBoard,
    enabled: !!quizId
  });
};

export default useQueryQuizLeaderBoard;
