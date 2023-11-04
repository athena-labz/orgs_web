import * as React from "react";

import { createContext, useState, useContext, useEffect } from "react";
import {
  taskListSample,
  userListSample,
  taskContentSample,
  userDataSample,
  submissionHistorySample,
} from "../assets/samples";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
});

export type BackEndContext = {
  getUserInformation: (token: string) => Promise<UserData>;
  getUserTasks: (
    token: string,
    organizationId: string,
    page: number,
    count: number
  ) => Promise<TaskListData>;
  signIn: (stakeAddress: string, signature: string) => Promise<string>;
  signUp: (
    userType: "student" | "teacher" | "organizer",
    email: string,
    stakeAddress: string,
    signature: string
  ) => Promise<void>;
  createOrganization: (
    token: string,
    type: "groups" | "individual",
    idenitifer: string,
    name: string,
    description: string,
    studentsPassword: string,
    teachersPassword: string,
    areas: string[]
  ) => Promise<void>;
  getOrganization: (organizationId: string) => Promise<OrganizationData>;
  joinOrganization: (token: string, organizationId: string, password: string) => Promise<void>;
  createGroup: (
    organizationId: string,
    groupId: string,
    name: string,
    area: string,
    leaderReward: string,
    members: string[]
  ) => Promise<void>;
  acceptGroup: (organizationId: string, groupId: string) => Promise<void>;
  rejectGroup: (organizationId: string, groupId: string) => Promise<void>;
  leaveGroup: (organizationId: string, groupId: string) => Promise<void>;
  createTask: (
    organizationId: string,
    taskId: string,
    name: string,
    description: string,
    deadline: Date
  ) => Promise<void>;
  getTask: (organizationId: string, taskId: string) => Promise<TaskData>;
  approveStartTask: (organizationId: string, taskId: string) => Promise<void>;
  rejectStartTask: (organizationId: string, taskId: string) => Promise<void>;
  submitTask: (
    organizationId: string,
    taskId: string,
    name: string,
    description: string
  ) => Promise<void>;
  submissionApproveTask: (
    organizationId: string,
    taskId: string
  ) => Promise<void>;
  submissionRejectTask: (
    organizationId: string,
    taskId: string,
    description: string
  ) => Promise<void>;
  submissionReviewTask: (
    organizationId: string,
    taskId: string,
    description: string
  ) => Promise<void>;
};

type BackEndProviderProps = {
  children: JSX.Element;
};

export const BackEnd = createContext<BackEndContext | null>(null);

export const BackEndProvider = ({ children }: BackEndProviderProps) => {
  const getUserInformation = async (token: string) => {
    const response = await api.get("/users/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return {
      userType: response.data.type,
      email: response.data.email,
      stakeAddress: response.data.stake_address,
      token: token,
    };
  };

  const getUserTasks = async (
    token: string,
    organizationId: string,
    page: number,
    count: number
  ) => {
    const response = await api.get(
      `/users/me/organization/${organizationId}/task?page=${page}&count=${count}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return {
      currentPage: response.data.currentPage,
      maxPage: response.data.max_page,
      elements: response.data.tasks.filter((task: any) => {
        let status = "Awaiting";
        if (task.is_approved_completed) {
          status = "Approved";
        } else if (task.is_rejected_completed || task.is_rejected_start) {
          status = "Rejected";
        } else if (task.is_approved_start) {
          status = "Progress";
        }

        return {
          ...task,
          deadline: new Date(task.deadline),
          status: status,
        };
      }),
    };
  };

  const signIn = async (stakeAddress: string, signature: string) => {
    const form = new FormData();
    form.append("username", stakeAddress);
    form.append("password", signature);

    const response = await api.post("/token", form);

    return response.data["access_token"];
  };

  const signUp = async (
    userType: "student" | "teacher" | "organizer",
    email: string,
    stakeAddress: string,
    signature: string
  ) => {
    const response = await api.post("/users/register", {
      user_type: userType,
      email: email,
      stake_address: stakeAddress,
      signature: signature,
    });

    return;
  };

  const createOrganization = async (
    token: string,
    type: "groups" | "individual",
    idenitifer: string,
    name: string,
    description: string,
    studentsPassword: string,
    teachersPassword: string,
    areas: string[]
  ) => {
    await api.post(
      "/organization/create",
      {
        organization_type: type,
        identifier: idenitifer,
        name: name,
        description: description,
        students_password: studentsPassword,
        teachers_password: teachersPassword,
        areas: areas,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const getOrganization = async (organizationId: string) => {
    const response = await api.get(`/organization/${organizationId}`);

    return {
      ...response.data,
      creationDate: new Date(response.data.creation_date),
    };
  };

  const joinOrganization = async (
    token: string,
    organizationId: string,
    password: string
  ) => {
    await api.post(
      `/organization/${organizationId}/join`,
      {
        password: password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return;
  };

  const createGroup = async (
    organizationId: string,
    identifier: string,
    name: string,
    area: string,
    leaderReward: string,
    members: string[]
  ) => {
    await api.post(`/organization/${organizationId}/group/create`, {
      identifier: identifier,
      name: name,
      area: area,
      leader_reward: leaderReward,
      members: members,
    });

    return;
  };

  const acceptGroup = async (organizationId: string, groupId: string) => {
    await api.post(`/organization/${organizationId}/group/${groupId}/accept`);

    return;
  };

  const rejectGroup = async (organizationId: string, groupId: string) => {
    await api.post(`/organization/${organizationId}/group/${groupId}/reject`);

    return;
  };

  const leaveGroup = async (organizationId: string, groupId: string) => {
    await api.post(`/organization/${organizationId}/group/${groupId}/leave`);

    return;
  };

  const createTask = async (
    organizationId: string,
    taskId: string,
    name: string,
    description: string,
    deadline: Date
  ) => {
    await api.post(`/organization/${organizationId}/group/task/create`, {
      identifier: taskId,
      name: name,
      description: description,
      deadline: deadline.toISOString(),
    });

    return;
  };

  const getTask = async (organizationId: string, taskId: string) => {
    const response = await api.get(
      `/organization/${organizationId}/task/${taskId}`
    );

    let status = "Awaiting";
    if (response.data.is_approved_completed) {
      status = "Approved";
    } else if (
      response.data.is_rejected_completed ||
      response.data.is_rejected_start
    ) {
      status = "Rejected";
    } else if (response.data.is_approved_start) {
      status = "Progress";
    }

    return {
      ...response.data,
      deadline: new Date(response.data.deadline),
      status: status,
    };
  };

  const approveStartTask = async (organizationId: string, taskId: string) => {
    await api.post(
      `/organization/${organizationId}/task/${taskId}/start/approve`
    );

    return;
  };

  const rejectStartTask = async (organizationId: string, taskId: string) => {
    await api.post(
      `/organization/${organizationId}/task/${taskId}/start/reject`
    );

    return;
  };

  const submitTask = async (
    organizationId: string,
    taskId: string,
    name: string,
    description: string
  ) => {
    await api.post(
      `/organization/${organizationId}/task/${taskId}/start/reject`,
      {
        name: name,
        description: description,
      }
    );

    return;
  };

  const submissionApproveTask = async (
    organizationId: string,
    taskId: string
  ) => {
    await api.post(
      `/organization/${organizationId}/task/${taskId}/submission/approve`
    );

    return;
  };

  const submissionRejectTask = async (
    organizationId: string,
    taskId: string,
    description: string
  ) => {
    await api.post(
      `/organization/${organizationId}/task/${taskId}/submission/reject`,
      {
        description: description,
      }
    );

    return;
  };

  const submissionReviewTask = async (
    organizationId: string,
    taskId: string,
    description: string
  ) => {
    await api.post(
      `/organization/${organizationId}/task/${taskId}/submission/review`,
      {
        description: description,
      }
    );

    return;
  };

  return (
    <BackEnd.Provider
      value={{
        getUserInformation,
        getUserTasks,
        signIn,
        signUp,
        createOrganization,
        getOrganization,
        joinOrganization,
        createGroup,
        acceptGroup,
        rejectGroup,
        leaveGroup,
        createTask,
        getTask,
        approveStartTask,
        rejectStartTask,
        submitTask,
        submissionApproveTask,
        submissionRejectTask,
        submissionReviewTask,
      }}
    >
      {children}
    </BackEnd.Provider>
  );
};

export const useBackEnd = () => useContext(BackEnd);
