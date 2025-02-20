// import Experts from '../pages/Experts/Experts'
import Login from '@/pages/Login'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    }
])

export default router