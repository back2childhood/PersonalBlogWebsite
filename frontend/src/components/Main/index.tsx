import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';

import s from './index.scss';

import { AuthRoute } from '../AuthRoute/authroute';

const About = lazy(() => import(/* webpackPrefetch:true */ '@/pages/About'));
const TagDetail = lazy(() => import('@/pages/TagDetail'));
const Post = lazy(() => import('@/pages/Post'));
const Setting = lazy(() => import('@/pages/Setting'));
const Home = lazy(() => import('@/pages/Home'));
const Tags = lazy(() => import('@/pages/Tags'));
const Search = lazy(() => import('@/pages/Search'));
const Login = lazy(() => import('@/pages/Login'));


const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <div className={s.center}>
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/article/details/:id' element={<Post />} />
              <Route path='/article/tag/:name' element={<TagDetail />} />
              <Route path='/article/tags' element={<Tags />} />
              <Route path='/article/search' element={<Search />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/setting' element={<AuthRoute><Setting /></AuthRoute>} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Main;
