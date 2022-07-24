import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AddDoctorPage from './pages/AddDoctorPage';
import UpdateDoctorPage from './pages/UpdateDoctorPage';
import DoctorsPage from './pages/DoctorsPage';
import NotFoundPage from './pages/NotFoundPage';

import AuthContext from './shared/context/auth-context';
import { useAuth } from './shared/hooks/use-auth';

const SignedInProtectedRoute = ({ children }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/welcome" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const App = () => {
  const { token, login, logout, userId } = useAuth();

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/welcome" replace={true} />}
            />
            <Route path="/welcome" element={<HomePage />} />
            <Route
              path="/auth"
              element={
                <SignedInProtectedRoute>
                  <AuthPage />
                </SignedInProtectedRoute>
              }
            />

            <Route
              path="/doctors"
              element={
                <ProtectedRoute>
                  <DoctorsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-doctor"
              element={
                <ProtectedRoute>
                  <AddDoctorPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctors/:doctorId"
              element={
                <ProtectedRoute>
                  <UpdateDoctorPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </>
  );
};

export default App;
