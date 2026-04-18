import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'; // 'react-router-dom' use karo
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Explore from '../pages/Explore';
import CreateRequest from '../pages/CreateRequest';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout'; // Layout import karna mat bhoolna

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Public Routes (No Sidebar) */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />

                {/* 2. Protected Routes (With Sidebar/Layout) */}
                {/* Yahan hum Layout component ko as a wrapper use kar rahe hain */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/explore" element={
                    <ProtectedRoute>
                        <Layout>
                            <Explore />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/create" element={
                    <ProtectedRoute>
                        <Layout>
                            <CreateRequest />
                        </Layout>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;