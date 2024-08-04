const CompletedMessage = () => {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="text-2xl font-semibold">You completed the quiz!</div>
      <div className="text-sm text-gray-500">Please check your ranking in the leaderboard</div>
    </div>
  )
}

export default CompletedMessage
