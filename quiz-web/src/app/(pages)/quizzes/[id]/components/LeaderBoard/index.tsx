interface LeaderBoardProps {
  isLoading: boolean
  users?: LeaderBoardUser[]
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({users, isLoading}) => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
          Leader Board
        </h2>
      </div>
      {
        isLoading ? (
          <div className="border-t border-gray-200 w-full h-60 px-4 py-5 sm:px-6">
            <div className="w-full h-full  bg-gray-200 animate-pulse">
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            {users?.map((user: any) => (
              <div key={user.username} className="flex justify-between space-y-4 items-center">
                <span className="text-gray-900 text-sm">{user.username}</span>
                <span className="font-semibold text-sm">{user.score}</span>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default LeaderBoard
