// import Experts from '../pages/Experts/Experts'
import Login from '@/pages/Login'
import Home from '@/pages/Home/Home'
import Add from '@/pages/Add/Add'
import MyLayout from '@/pages/Layout'

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Detail from '@/pages/Detail/Detail'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MyLayout />,
        children: [
            {
                // path: 'home',
                index: true,
                element: <Home />
            },
            {
                path: 'publish',
                element: <Add />
                // element: <AuthRoute><Add /></AuthRoute>
            },
            {
                path: 'detail:id',
                element: <Detail />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router