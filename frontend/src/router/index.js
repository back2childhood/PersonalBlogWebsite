// import Experts from '../pages/Experts/Experts'
import Login from '@/pages/Login'
import Home from '@/pages/Home/Home'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute> <Home /></AuthRoute>,
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router