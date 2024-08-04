interface HeaderProps {
  name?: string
  description?: string
  score?: number
}

const Header: React.FC<HeaderProps> = ({ name, description, score }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-semibold mx-auto">{name}</div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <div className="mt-2 text-lg text-gray-900 font-bold">
        Score: {score}
      </div>
    </div>
  )
}

export default Header
