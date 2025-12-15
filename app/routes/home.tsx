import { usePageTitle } from "~/hooks/usePageTitle"

const Home = () => {
  usePageTitle("RentRight - Home")
  return (
    <div className="p-4 text-center">Home</div>
  )
}

export default Home