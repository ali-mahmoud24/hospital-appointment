import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DoctorAppointments from './pages/AppointmentsPage';
import AddDoctorPage from './pages/AddDoctorPage';
import NotFoundPage from './pages/NotFoundPage'

import AuthPageAdmin from './pages/AuthPageAdmin';
import AuthPageUser from './pages/AuthPageUser';

import { useAuthContext } from './context/auth-context';

const SignedInProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/auth/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace={true} />} />
          <Route path="/welcome" element={<HomePage />} />
          <Route
            path="/auth/admin"
            element={
              <SignedInProtectedRoute>
                <AuthPageAdmin />
              </SignedInProtectedRoute>
            }
          />
          {/* <Route
            path="/auth/user"
            element={
              <SignedInProtectedRoute>
                <AuthPageUser />
              </SignedInProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/add-doctor"
            element={
              <ProtectedRoute>
                <AddDoctorPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

// TODO ===>
// 1- Refactor the SignedInProtectedRoute and ProtectedRoute components to a seperate file
// 2- Style the 404 Not found page
// 3- Style the 'Start shopping' button in StartingPageContent component
// 4- Style the Products + ProductItem components better (problems with flexbox and aligning items better UI overall)
// 5- Resposive design
// 6- Add green border to inputs when inputs are valid
