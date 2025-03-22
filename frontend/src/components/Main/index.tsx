import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';

import s from './index.scss';

import Setting from '@/pages/Setting';
import Home from '@/pages/Home';
import Tags from '@/pages/Tags';

const About = lazy(() => import(/* webpackPrefetch:true */ '@/pages/About'));

const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <div className={s.center}>
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='articles' element={<Articles />} /> */}
              <Route path='tags' element={<Tags />} />
              <Route path='/setting' element={<Setting />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Main;
