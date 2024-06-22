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

export function swapElementsInColumn(arr: TaskItem[], elem: TaskItem, position: number): TaskItem[] | [] {
    if (!arr || !elem || !position) return [];

    let leftElements: TaskItem[] = [];
    let rightElements: TaskItem[] = [];

    if (position <= 1) {
        rightElements = arr;
    } else {
        leftElements = arr.slice(0, position - 1);
        leftElements = leftElements.filter(el => el.id !== elem.id);
        rightElements = arr.slice(position - 1);
    }
    let test = arr.splice(position + 1, 0, elem);
    test.forEach((el) => {
        console.log('test', el.id)
    });

    // rightElements.forEach((el) => {
    //     console.log(el.id)
    // });

    rightElements = rightElements.filter(el => el.id !== elem.id);
    return arr.splice(position, 0, elem);
    return [...leftElements, elem, ...rightElements];
};