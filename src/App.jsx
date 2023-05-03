import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import ApplyJobPage from './pages/ApplyJob';
import UpdateJobPage from './pages/UpdateJob';
import ErrorPage from './pages/Error';
import JobDetailPage from './pages/JobDetail';
import JobsPage from './pages/Jobs';
import JobsRootLayout from './pages/JobsRoot';
import HomePage from './pages/Home';
import NewJobPage from './pages/NewJob';
import RootLayout from './pages/Root';
import DeleteJobPage from './pages/DeleteJob';
import AuthenticationPage from './pages/Authentication';
import LogoutPage from './pages/Logout';
import NotFoundPage from './pages/NotFound';
import { UserContext } from './components/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import PrivateRoute from './PrivateRoute';

function App() {

    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateEmail = (newEmail) => {
        console.log("Updating email to:", newEmail);
        setEmail(newEmail);
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />}></Route>
                <Route path="/auth" element={<AuthenticationPage />}></Route>
                <Route path="/logout" element={<LogoutPage />}></Route>
                <Route path="/jobs" element={<JobsRootLayout />}>
                    <Route index element={<JobsPage />}></Route>
                    <Route path="/jobs/:id" id="job-detail">
                        <Route index element={<JobDetailPage />}></Route>
                        <Route path="/jobs/:id/apply" element={<ApplyJobPage />}></Route>
                        <Route path="/jobs/:id/edit" element={
                            <PrivateRoute isLoggedIn={isLoggedIn} roleReq={"EMPLOYER"}>
                                <UpdateJobPage />
                            </PrivateRoute>}>
                        </Route>
                        <Route path="/jobs/:id/delete" element={
                            <PrivateRoute isLoggedIn={isLoggedIn} roleReq={"EMPLOYER"}>
                                <DeleteJobPage />
                            </PrivateRoute>}>
                        </Route>
                    </Route>
                    <Route path="/jobs/new" element={
                        <PrivateRoute isLoggedIn={isLoggedIn} roleReq={"EMPLOYER"}>
                            <NewJobPage />
                        </PrivateRoute>}>
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />}></Route>
            </Route>
            
        )
    );

    return (
        <QueryClientProvider client={new QueryClient()}>
            <UserContext.Provider value={{ email, setEmail: updateEmail, userId, setUserId, isLoggedIn, setIsLoggedIn }}>
                <div className={"App"}>
                    <RouterProvider router={router} />
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
