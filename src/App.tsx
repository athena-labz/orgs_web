import React from "react";

import { Routes, Route, Navigate, useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import CreateOrganization from "./pages/CreateOrganization";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";

import OrganizationSelect from "./pages/OrganizationSelect";
import OrganizationPage from "./pages/OrganizationPage";
import SpecificTaskPage from "./pages/SpecficTaskPage";
import TasksPage from "./pages/TasksPage";
import ProfilePage from "./pages/ProfilePage";
import FundTaskPage from "./pages/FundTaskPage";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import { WalletProvider } from "./contexts/WalletProvider";
import { BackEndProvider } from "./contexts/BackEndProvider";
import { UserProvider } from "./contexts/UserProvider";

import "react-toastify/dist/ReactToastify.css";
import CreateTaskPage from "./pages/CreateTaskPage";
import OrganizationJoin from "./pages/OrganizationJoin";
import GroupCreatePage from "./pages/GroupCreatePage";
import SubmitWorkPage from "./pages/SubmitWorkPage";
import SubmitCrowdfundingWorkPage from "./pages/SubmitCrowdfundingWorkPage"
import ReviewWorkPage from "./pages/ReviewWorkPage";
import ReviewCrowdfundingWorkPage from "./pages/ReviewCrowdfundingWorkPage"
import CrowdfundingPage from "./pages/CrowdfundingPage";
import CreateCrowdfundingPage from "./pages/CreateCrowdfundingPage";
import SpecificCrowdfundingPage from "./pages/SpecficCrowdfundingPage";

const RedirectToTasks = () => {
  const { organizationId } = useParams<{ organizationId: string }>();

  return <Navigate to={`/organization/${organizationId}/tasks`} replace />;
};

type SpecificTaskRedirectParams = { organizationId: string; taskId: string };

const SpecificTaskRedirect = () => {
  const { organizationId, taskId } = useParams<SpecificTaskRedirectParams>();

  if (!organizationId) return <NotFoundPage />;

  if (!taskId) {
    return <RedirectToTasks />;
  }

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="tasks">
      <SpecificTaskPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

const SpecificCrowdfundingRedirect = () => {
  const { organizationId, taskId } = useParams<SpecificTaskRedirectParams>();

  if (!organizationId) return <NotFoundPage />;

  if (!taskId) {
    return <CrowdfundingRedirect />;
  }

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="crowdfunding">
      <SpecificCrowdfundingPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

type CreateTaskRedirectParams = { organizationId: string };

const CreateTaskRedirect = () => {
  const { organizationId } = useParams<CreateTaskRedirectParams>();

  if (!organizationId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="tasks">
      <CreateTaskPage organizationId={organizationId} />
    </OrganizationPage>
  );
};

const CreateCrowdfundingRedirect = () => {
  const { organizationId } = useParams<CreateTaskRedirectParams>();

  if (!organizationId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="crowdfunding">
      <CreateCrowdfundingPage organizationId={organizationId} />
    </OrganizationPage>
  );
}

type TasksRedirectParams = { organizationId: string };

const TasksRedirect = () => {
  const { organizationId } = useParams<TasksRedirectParams>();

  if (!organizationId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="tasks">
      <TasksPage organizationId={organizationId} />
    </OrganizationPage>
  );
};

const CrowdfundingRedirect = () => {
  const { organizationId } = useParams<TasksRedirectParams>();

  if (!organizationId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="crowdfunding">
      <CrowdfundingPage organizationId={organizationId} />
    </OrganizationPage>
  );
}

type TaskSubmitRedirectParams = { organizationId: string; taskId: string };

const TaskSubmitRedirect = () => {
  const { organizationId, taskId } = useParams<TaskSubmitRedirectParams>();

  if (!organizationId) return <NotFoundPage />;
  if (!taskId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="tasks">
      <SubmitWorkPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

const CrowdfundingSubmitRedirect = () => {
  const { organizationId, taskId } = useParams<TaskSubmitRedirectParams>();

  if (!organizationId) return <NotFoundPage />;
  if (!taskId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="crowdfunding">
      <SubmitCrowdfundingWorkPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

type TaskReviewRedirectParams = { organizationId: string; taskId: string };

const TaskReviewRedirect = () => {
  const { organizationId, taskId } = useParams<TaskReviewRedirectParams>();

  if (!organizationId) return <NotFoundPage />;
  if (!taskId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="tasks">
      <ReviewWorkPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

const CrowdfundingReviewRedirect = () => {
  const { organizationId, taskId } = useParams<TaskReviewRedirectParams>();

  if (!organizationId) return <NotFoundPage />;
  if (!taskId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="tasks">
      <ReviewCrowdfundingWorkPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

const CrowdfundingFundRedirect = () => {
  const { organizationId, taskId } = useParams<TaskReviewRedirectParams>();

  if (!organizationId) return <NotFoundPage />;
  if (!taskId) return <NotFoundPage />;

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="crowdfunding">
      <FundTaskPage organizationId={organizationId} taskId={taskId} />
    </OrganizationPage>
  );
};

type ProfileRedirectParams = {
  organizationId: string;
};

const ProfileRedirect = () => {
  const { organizationId } = useParams<ProfileRedirectParams>();

  // Replace console.error with react toastify

  if (!organizationId) {
    console.error("Username not defined in Profile page");

    return <Navigate to="/" replace />;
  }

  return (
    <OrganizationPage
      organizationId={organizationId}
      currentSelection="profile"
    >
      <ProfilePage organization={organizationId} />
    </OrganizationPage>
  );
};

type GroupCreateParams = {
  organizationId: string;
};

const GroupCreateRedirect = () => {
  const { organizationId } = useParams<GroupCreateParams>();

  if (!organizationId) {
    console.error("Organization not defined in create group page");

    return <Navigate to="/" replace />;
  }

  return (
    <OrganizationPage
      organizationId={organizationId}
      currentSelection="profile"
    >
      <GroupCreatePage organizationId={organizationId} />
    </OrganizationPage>
  );
};

type UsersRedirectParams = {
  organizationId: string;
};

const UsersRedirect = () => {
  const { organizationId } = useParams<UsersRedirectParams>();

  if (!organizationId) {
    console.error("Organization not defined in create group page");

    return <NotFoundPage />;
  }

  return (
    <OrganizationPage organizationId={organizationId} currentSelection="users">
      <UsersPage organizationId={organizationId} />
    </OrganizationPage>
  );
};

function App() {
  return (
    <BackEndProvider>
      <WalletProvider networkMode="mainnet">
        <UserProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/organization/create"
              element={
                <ProtectedRoute>
                  <CreateOrganization />
                </ProtectedRoute>
              }
            />

            <Route
              path="/organization/select"
              element={
                <ProtectedRoute>
                  <OrganizationSelect />
                </ProtectedRoute>
              }
            />

            <Route
              path="/organization/join"
              element={
                <ProtectedRoute>
                  <OrganizationJoin />
                </ProtectedRoute>
              }
            />

            <>
              <Route
                path="/organization/:organizationId"
                element={
                  <ProtectedRoute>
                    <RedirectToTasks />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/tasks"
                element={
                  <ProtectedRoute>
                    <TasksRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/crowdfunding"
                element={
                  <ProtectedRoute>
                    <CrowdfundingRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/tasks/create"
                element={
                  <ProtectedRoute>
                    <CreateTaskRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/crowdfunding/create"
                element={
                  <ProtectedRoute>
                    <CreateCrowdfundingRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/tasks/:taskId"
                element={
                  <ProtectedRoute>
                    <SpecificTaskRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/crowdfunding/:taskId"
                element={
                  <ProtectedRoute>
                    <SpecificCrowdfundingRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/tasks/:taskId/submit"
                element={
                  <ProtectedRoute>
                    <TaskSubmitRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/crowdfunding/:taskId/submit"
                element={
                  <ProtectedRoute>
                    <CrowdfundingSubmitRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/tasks/:taskId/review"
                element={
                  <ProtectedRoute>
                    <TaskReviewRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/crowdfunding/:taskId/review"
                element={
                  <ProtectedRoute>
                    <CrowdfundingReviewRedirect />
                  </ProtectedRoute>
                }
              />
            </>

            <Route
              path="/organization/:organizationId/crowdfunding/:taskId/fund"
              element={
                <ProtectedRoute>
                  <CrowdfundingFundRedirect />
                </ProtectedRoute>
              }
            />

            <>
              <Route
                path="/organization/:organizationId/users"
                element={
                  <ProtectedRoute>
                    <UsersRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/profile"
                element={
                  <ProtectedRoute>
                    <ProfileRedirect />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organization/:organizationId/group/create"
                element={
                  <ProtectedRoute>
                    <GroupCreateRedirect />
                  </ProtectedRoute>
                }
              />
            </>

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </UserProvider>
      </WalletProvider>
    </BackEndProvider>
  );
}

export default App;