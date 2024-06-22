import { useNavigate } from "react-router-dom"

export const useNavigation = (path: string): void => {
    const navigate = useNavigate()
    return (navigate(path))
}