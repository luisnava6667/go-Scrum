import "./App.css";
import Login from "./components/views/auth/Login/Login";
import { Register } from "./components/views/auth/Register/Register";
import { lazy, Suspense } from "react";
import { Tasks } from "./components/views/Tasks/Tasks";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Registered from "./components/views/Registered/Registered";
const Error404 = lazy(() => import("./components/views/Error404/Error404"));
const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const PageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
export const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variant={PageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/registered/:teamID"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variant={PageTransition}
            >
              <Registered />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variant={PageTransition}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variant={PageTransition}
              >
                <Tasks />
              </motion.div>
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variant={PageTransition}
            >
              <Suspense fallback={<>...</>}>
                <Error404 />
              </Suspense>
            </motion.div>
          }
        />
      </Routes>

      
    </AnimatePresence>
  );
};
