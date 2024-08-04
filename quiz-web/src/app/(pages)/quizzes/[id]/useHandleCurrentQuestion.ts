import useQueryQuizLeaderBoard from "@/app/hooks/useQueryQuizLeaderBoard";
import useQueryQuizSession, { QUERY_QUIZ_SESSION } from "@/app/hooks/useQueryQuizSession";
import useQueryUserAnswers, { QUERY_USER_ANSWERS } from "@/app/hooks/useQueryUserAnswers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { orderBy } from 'lodash'
import useHandleQuizSessionEvent from "./useHandleQuizSessionEvent";
import { useQueryClient } from "@tanstack/react-query";
import useAnswerQuestion from "@/app/hooks/useAnswerQuestion";

const useHandleCurrentQuestion = (id: string) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question| undefined>(undefined)
  const [questionStatus, setQuestionStatus] = useState<'new' | 'answered' | 'evaluated' | undefined>('new')
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(undefined)
  const [correctOptionId, setCorrectOptionId] = useState<number | undefined>(undefined)

  const queryClient = useQueryClient()

  const onUserAnswerEvaluated = useCallback((data: UserAnswerEvaluatedEventData) => {
    const { newScore, quizSessionId, username, ...userAnswer } = data

    queryClient.setQueryData([QUERY_USER_ANSWERS, quizSessionId], (old: any) => [
      ...old,
      userAnswer
    ])

    queryClient.setQueryData([QUERY_QUIZ_SESSION, id], (old: any) => ({
      ...old,
      score: newScore
    }))

    setCorrectOptionId(data.correctOptionId)
    setQuestionStatus('evaluated')
  }, [])

  const onLeaderBoardUpdated = useCallback(() => {
    refetchLeaderBoard()
  }, [])

  const { onJoinQuizSessionConnection } = useHandleQuizSessionEvent(onUserAnswerEvaluated, onLeaderBoardUpdated)

  const {data: quizSession, isLoading} = useQueryQuizSession(id, (data: QuizSession) => {
    onJoinQuizSessionConnection(data?.id)
  })

  const {data: userAnswers, isLoading: userAnswersLoading, refetch: refetchUserAnswers} = useQueryUserAnswers(quizSession?.id)
  const {data: leaderBoard, isLoading: isLoadingLeaderBoard, refetch: refetchLeaderBoard} = useQueryQuizLeaderBoard(id)
  const { mutate: answerQuestion } = useAnswerQuestion()

  const unAnsweredQuestions = useMemo(() => {
    if (!quizSession?.quiz?.questions || !userAnswers) return []
    return quizSession?.quiz?.questions.filter((question) => {
      return question.id === currentQuestion?.id || !userAnswers.find((answer) => answer.questionId === question.id)
    })
  }, [quizSession?.quiz?.questions, userAnswers, currentQuestion])

  const isCompleted = useMemo(() => {
    return unAnsweredQuestions?.length === 0
  }, [unAnsweredQuestions])

  const onNext = useCallback(() => {
    setQuestionStatus('new')
    setCurrentQuestion(undefined)
  }, [])

  const onAnswerQuestion = useCallback((questionOptionId: number) => {
    if (!quizSession?.id || !currentQuestion?.id || !questionOptionId || questionStatus !== 'new') return

    setSelectedOptionId(questionOptionId)
    setQuestionStatus('answered')

    answerQuestion({
      questionSessionId: quizSession?.id,
      questionId: currentQuestion?.id,
      questionOptionId: questionOptionId
    })
  }, [answerQuestion, quizSession?.id, currentQuestion?.id, questionStatus])

  useEffect(() => {
    if (unAnsweredQuestions.length > 0) {
      setCurrentQuestion(orderBy(unAnsweredQuestions, 'createdAt', 'asc')?.[0])
    }
  }, [unAnsweredQuestions])

  return {
    isLoading: isLoading || userAnswersLoading,
    quizSession,
    isCompleted,
    currentQuestion,
    selectedOptionId,
    correctOptionId,
    questionStatus,
    isLoadingLeaderBoard,
    leaderBoard,
    onAnswerQuestion,
    onNext
  }
}

export default useHandleCurrentQuestion
