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
import { UserContext } from './components/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

    const [email, setEmail] = useState("");

    const updateEmail = (newEmail) => {
        console.log("Updating email to:", newEmail);
        setEmail(newEmail);
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />}></Route>
                <Route path="/auth" element={<AuthenticationPage />}></Route>
                <Route path="/jobs" element={<JobsRootLayout />}>
                    <Route index element={<JobsPage />}></Route>
                    <Route path="/jobs/:id" id="job-detail">
                        <Route index element={<JobDetailPage />}></Route>
                        <Route path="/jobs/:id/apply" element={<ApplyJobPage />}></Route>
                        <Route path="/jobs/:id/edit" element={<UpdateJobPage />}></Route>
                        <Route path="/jobs/:id/delete" element={<DeleteJobPage />}></Route>
                    </Route>
                    <Route path="/jobs/new" element={<NewJobPage />}></Route>
                </Route>
            </Route>
        )
    );

    return (
        <QueryClientProvider client={new QueryClient()}>
            <UserContext.Provider value={{ email, setEmail: updateEmail }}>
                <div className={"App"}>
                    <RouterProvider router={router} />
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
