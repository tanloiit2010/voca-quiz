import classNames from "classnames"

interface QuestionProps {
  question?: Question
  selectedOptionId?: number
  correctOptionId?: number
  isLoading?: boolean
  canAnswer?: boolean
  onAnswerQuestion: (questionOptionId: number) => void
}

const Question: React.FC<QuestionProps> = ({ question, selectedOptionId, correctOptionId, isLoading, canAnswer, onAnswerQuestion }) => {
  if (!question) return null

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 text-gray-900 text-lg">
          {question?.content}
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-2 gap-6">
        {
          question?.questionOptions.map((option) => {
            return (
              <div className={classNames("bg-white shadow sm:rounded-lg relative", {
                "!bg-red-400": !isLoading && !!selectedOptionId && !!correctOptionId && option.id === selectedOptionId && option.id !== correctOptionId,
                "!bg-green-400": !isLoading && !!selectedOptionId && !!correctOptionId && option.id === correctOptionId,
              })} key={option.id}>
                <button className="w-full text-left px-4 py-5 sm:px-6 text-gray-900 text-lg" onClick={() => onAnswerQuestion(option.id)} disabled={!canAnswer}>
                  {option.content}
                </button>
                {
                  isLoading && selectedOptionId && option.id === selectedOptionId && (
                    <div className="absolute left-0 top-0 w-full h-full  bg-gray-200 animate-pulse opacity-80">
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Question
