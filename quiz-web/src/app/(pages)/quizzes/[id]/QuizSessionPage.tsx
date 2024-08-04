"use client";

import { useParams } from "next/navigation";
import LeaderBoard from "./components/LeaderBoard";
import Loading from "@/app/(components)/Loading";
import Question from "./components/Question";
import Button from "@/app/(components)/Button";
import classNames from "classnames";
import useHandleCurrentQuestion from "./useHandleCurrentQuestion";
import Header from "./components/Header";
import CompletedMessage from "./components/CompletedMessage";

const QuizSessionPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const {id} = params 

  const {
    isLoading,
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
  } = useHandleCurrentQuestion(id)

  if (isLoading) return (
    <div className="mt-8 w-full flex justify-center">
      <Loading />
    </div>
  )

  return (
    <div className="mt-8 px-4 sm:px-6 w-full">
     <Header name={quizSession?.quiz?.name} description={quizSession?.quiz?.description} score={quizSession?.score} />
      <div className={classNames("w-full mt-8", {
        "grid grid-cols-1 gap-8 lg:grid-cols-4": !isCompleted,
        "space-y-8": isCompleted
      })}>
        <div className="space-y-6 lg:col-span-3 lg:col-start-1">
          {
            isCompleted ? (
              <CompletedMessage />
            ) : (
              <>
                <Question 
                  question={currentQuestion} 
                  selectedOptionId={selectedOptionId}
                  correctOptionId={correctOptionId}
                  isLoading={questionStatus === 'answered'}
                  canAnswer={questionStatus === 'new'}
                  onAnswerQuestion={onAnswerQuestion}
                />
                {
                  questionStatus === 'evaluated' && (
                    <div className="flex justify-end">
                      <Button onClick={onNext}>
                        Next
                      </Button>                      
                    </div>
                  )
                }
              </>
            )
          }
        </div>
        <section className={classNames("lg:col-span-1 lg:col-start-4", {
          "max-w-sm mx-auto": isCompleted
        })}>
          <LeaderBoard isLoading={isLoadingLeaderBoard} users={leaderBoard} />
        </section>
      </div>
    </div>
  );
};

export default QuizSessionPage;


