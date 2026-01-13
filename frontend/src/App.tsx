import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Login pages
import SPLogin from './pages/SPLogin';
import Instructions from './pages/Instructions';

// Home pages
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';

// Transaction pages
import TransactionsMenu from './pages/TransactionsMenu';
import BookAvailable from './pages/BookAvailable';
import SearchResult from './pages/SearchResult';
import IssueRequest from './pages/IssueRequest';
import ActiveIssue from './pages/ActiveIssue';
import OverdueReturn from './pages/OverdueReturn';
import ReturnBook from './pages/ReturnBook';
import PayFine from './pages/PayFine';

// Master pages
import MasterMenu from './pages/MasterMenu';
import MasterBooks from './pages/MasterBooks';
import MasterMovies from './pages/MasterMovies';
import MasterMembership from './pages/MasterMembership';

// Maintenance pages
import MaintenanceMenu from './pages/MaintenanceMenu';
import AddMembership from './pages/AddMembership';
import UpdateMembership from './pages/UpdateMembership';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import AddMovie from './pages/AddMovie';
import UpdateMovie from './pages/UpdateMovie';
import UserManagement from './pages/UserManagement';

// Reports pages
import ReportsMenu from './pages/ReportsMenu';
import ActiveIssueReport from './pages/ActiveIssueReport';
import OverdueReturnReport from './pages/OverdueReturnReport';

// System pages
import Confirmation from './pages/Confirmation';

// Home route component that redirects based on role
const HomeRoute: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'Admin') {
    return <Navigate to="/admin-home" replace />;
  } else if (user?.role === 'User') {
    return <Navigate to="/user-home" replace />;
  }
  
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SPLogin />} />
          <Route 
            path="/instructions" 
            element={
              <ProtectedRoute>
                <Instructions />
              </ProtectedRoute>
            } 
          />

          {/* Home routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomeRoute />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-home" 
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-home" 
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            } 
          />

          {/* Transaction routes */}
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <TransactionsMenu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/book-available" 
            element={
              <ProtectedRoute>
                <BookAvailable />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/search-result" 
            element={
              <ProtectedRoute>
                <SearchResult />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/issue-request" 
            element={
              <ProtectedRoute>
                <IssueRequest />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/active-issue" 
            element={
              <ProtectedRoute>
                <ActiveIssue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/overdue-return" 
            element={
              <ProtectedRoute>
                <OverdueReturn />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/return-book" 
            element={
              <ProtectedRoute>
                <ReturnBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions/pay-fine" 
            element={
              <ProtectedRoute>
                <PayFine />
              </ProtectedRoute>
            } 
          />

          {/* Master routes */}
          <Route 
            path="/master" 
            element={
              <ProtectedRoute>
                <MasterMenu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/master/books" 
            element={
              <ProtectedRoute>
                <MasterBooks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/master/movies" 
            element={
              <ProtectedRoute>
                <MasterMovies />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/master/membership" 
            element={
              <ProtectedRoute>
                <MasterMembership />
              </ProtectedRoute>
            } 
          />

          {/* Maintenance routes (Admin only) */}
          <Route 
            path="/maintenance" 
            element={
              <ProtectedRoute requireAdmin>
                <MaintenanceMenu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/add-membership" 
            element={
              <ProtectedRoute requireAdmin>
                <AddMembership />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/update-membership" 
            element={
              <ProtectedRoute requireAdmin>
                <UpdateMembership />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/add-book" 
            element={
              <ProtectedRoute requireAdmin>
                <AddBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/update-book" 
            element={
              <ProtectedRoute requireAdmin>
                <UpdateBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/add-movie" 
            element={
              <ProtectedRoute requireAdmin>
                <AddMovie />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/update-movie" 
            element={
              <ProtectedRoute requireAdmin>
                <UpdateMovie />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance/user-management" 
            element={
              <ProtectedRoute requireAdmin>
                <UserManagement />
              </ProtectedRoute>
            } 
          />

          {/* Reports routes */}
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute>
                <ReportsMenu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports/active-issue" 
            element={
              <ProtectedRoute>
                <ActiveIssueReport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reports/overdue-return" 
            element={
              <ProtectedRoute>
                <OverdueReturnReport />
              </ProtectedRoute>
            } 
          />

          {/* System routes */}
          <Route 
            path="/confirmation" 
            element={
              <ProtectedRoute>
                <Confirmation />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
