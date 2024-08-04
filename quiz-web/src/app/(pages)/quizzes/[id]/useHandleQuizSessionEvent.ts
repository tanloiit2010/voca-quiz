import { EVENT_NAMES, MOCK_JWT } from "@/app/constants";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useHandleQuizSessionEvent = (
  onUserAnswerEvaluated: (answer: UserAnswerEvaluatedEventData) => void,
  onLeaderBoardUpdated: (leaderBoard: LeaderBoardUpdatedEventData) => void
) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const options = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${MOCK_JWT}`
          }
        }
      }
    }
    const newSocket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL as string, options);
    setSocket(newSocket);
  }, [setSocket])

  useEffect(() => {
    socket?.on(EVENT_NAMES.USER_ANSWER_EVALUATED, onUserAnswerEvaluated);

    return () => {
      socket?.off(EVENT_NAMES.USER_ANSWER_EVALUATED, onUserAnswerEvaluated);
    };
  }, [socket, onUserAnswerEvaluated]);

  useEffect(() => {
    socket?.on(EVENT_NAMES.LEADER_BOARD_UPDATED, onLeaderBoardUpdated);

    return () => {
      socket?.off(EVENT_NAMES.LEADER_BOARD_UPDATED, onLeaderBoardUpdated);
    };
  }, [socket, onLeaderBoardUpdated]);

  const onJoinQuizSessionConnection = (quizSessionId: number) => {
    if (!socket || !quizSessionId) return;

    socket?.emit(EVENT_NAMES.JOIN_QUIZ_SESSION, {
      quizSessionId
    });
  };

  return {
    onJoinQuizSessionConnection
  }

}

export default useHandleQuizSessionEvent;
