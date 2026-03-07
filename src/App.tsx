import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './utilities/AuthContext';
import PrivateRoute from './utilities/PrivateRoute';
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserAccountPage from './pages/UserAccountPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/account" element={
            <PrivateRoute>
              <UserAccountPage />
            </PrivateRoute>
          } />
          <Route path="/admin/*" element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;