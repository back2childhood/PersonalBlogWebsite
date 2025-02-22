// core logic: (check if the token has been saved)
// If the user has already logged in, they will be redirected to the new page.

const { getToken } = require("@/utils");
const { Navigate } = require("react-router-dom");

// if he didn't login yet, then jump to the login page
export function AuthRoute({ children }) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        <Navigate to={'/login'} />
    }
}