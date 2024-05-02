import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTasks } from "../../utilits/utilit";

export const getAllUserTasks = createAsyncThunk(
    "task/getAllUserTasks",
    async (user_id: Number) => {
        let res = await getAllTasks(user_id);
        return res;
    }
);
