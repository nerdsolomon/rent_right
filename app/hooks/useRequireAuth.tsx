import { useNavigate } from "react-router"
import { useData } from "./useData"

export const useRequireAuth = () => {
  const { isAuthenticated } = useData()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate("/")
  }
}
