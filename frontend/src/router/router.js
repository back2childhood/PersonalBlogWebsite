import Experts from '../Pages/Experts/Experts'
import Login from '../Pages/Login/Login'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/experts",
        element: <Experts />
    }
])

export default router