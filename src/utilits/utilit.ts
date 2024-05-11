import axios from "axios";
import { ChangeTask, TaskItem, UserFormState } from "../models/models";
import { serverPath } from "./constants";

//user
export const addNewUser = async (user: UserFormState) => {
    try {
        let dataUser = {
            name: user.name,
            password: user.password,
            userMail: user.mail
        };
        const resp = await axios.post(`${serverPath}`, dataUser);
        return resp.data;
    } catch (er) {
        console.log(er);
    }
};

export const autoriseUser = async (user: UserFormState) => {
    try {
        const resp = await axios.get(`${serverPath}`, {
            params: {
                name: user.name,
                password: user.password,
            },
        });
        return resp.data;
    } catch (er) {
        console.log(er);
    }
};

// task
export const getAllTasks = async (user_id: Number) => {
    try {
        const resp = await axios.get(`${serverPath}task`, {
            params: {
                user_id
            },
        });
        return resp.data;
    } catch (er) {
        console.log(er);
    }
};

export const changeTaskAction = async (data: ChangeTask) => {
    try {
        const resp = await axios.put(`${serverPath}task/${data.task_id}`, {
            ...data
        });
        return resp.data;
    } catch (er) {
        console.log(er);
    }
};

export function swapElementsInCollumn(arr: TaskItem[], elem: TaskItem, position: number): TaskItem[] | [] {
    if (!arr || !elem || !position) return [];

    let leftElements: TaskItem[] = [];
    let rigthElements: TaskItem[] = [];

    if (position <= 1) {
        rigthElements = arr;
    } else {
        leftElements = arr.slice(0, position);
        leftElements = leftElements.filter(el => el.id !== elem.id);
        rigthElements = arr.slice(position);
    }
    rigthElements = rigthElements.filter(el => el.id !== elem.id);

    return [...leftElements, elem, ...rigthElements];
};