import { usePageTitle } from "~/hooks/usePageTitle"

const Home = () => {
  usePageTitle("RentRight - Home")
  return (
    <div className="text-center">Home</div>
  )
}

export default Home