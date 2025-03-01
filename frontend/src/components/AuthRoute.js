// core logic: (check if the token has been saved)
// If the user has already logged in, they will be redirected to the new page.

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

// if he didn't login yet, then jump to the login page
export function AuthRoute({ children }) {
    const token = getToken()
    // console.log("authrouth: " + token)
    if (token) {
        return <>{children}</>
    } else {
        <Navigate to={'/login'} />
    }
}