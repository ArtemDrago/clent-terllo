import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTasks, changeTaskAction } from "../../utilits/utilit";
import { ChangeTask } from "../../models/models";

export const getAllUserTasks = createAsyncThunk(
    "task/getAllUserTasks",
    async (user_id: Number) => {
        let res = await getAllTasks(user_id);
        return res;
    }
);
export const changeTask = createAsyncThunk(
    "task/changeTask",
    async (data: ChangeTask) => {
        let res = await changeTaskAction(data);
        return res;
    }
);
