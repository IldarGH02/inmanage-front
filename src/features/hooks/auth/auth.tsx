import { useContext } from "react"
import { Context } from "../../../main"

export const useAuth = () => {
    const { authStore } = useContext(Context)
    return authStore
}