import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import RequestCertificate from './pages/RequestCertificate.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import VerifyCertificate from './pages/VerifyCertificate.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Requests from './pages/Requests.jsx';
import Users from './pages/Users.jsx';
import Reports from './pages/Reports.jsx';
import Documents from './pages/Documents.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/request-certificate" element={<RequestCertificate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:requestNo" element={<VerifyCertificate />} />
        </Route>
        <Route path="/app" element={<Protected><DashboardLayout /></Protected>}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="documents" element={<Documents />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
