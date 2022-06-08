import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import pages from './pages';

export default function Routing() {
  const currentUser = useSelector((state: any) => state?.user);
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes key={location.pathname} location={location}>
        {pages.map((page) => {
          if (page.auth && !currentUser) {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <Navigate
                    to="/login"
                    state={{
                      from: {
                        pathname: page.path,
                      },
                    }}
                  />
                }
              />
            );
          } else {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={!page.auth ? <page.main /> : <page.main />}
              />
            );
          }
        })}
      </Routes>
    </AnimatePresence>
  );
}
