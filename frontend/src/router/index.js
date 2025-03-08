// import Experts from '../pages/Experts/Experts'

import Login from '@/pages/Login'
import MyLayout from '@/pages/Layout'

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { Suspense, lazy } from 'react'
import Profile from '@/pages/Profile'

// use lazy function to import the module
const Home = lazy(() => import('@/pages/Home'))
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))

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
                element: <AuthRoute><Publish /></AuthRoute>
            },
            {
                path: 'article',
                element: <Article />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/profile",
        element: <Profile />
    }
])

export default router