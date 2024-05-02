import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "../../models/models";
import { getAllUserTasks } from "./asyncTaskReducer";

const initialState: TaskState = {
    tasks: [],
};

export const taskReduser = createSlice({
    name: "services",
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUserTasks.fulfilled, (state, action) => {
            try {
                let res = action.payload;
                if (res.hasOwnProperty('message')) {
                    alert(res.message);
                } else {
                    state.tasks = res;
                }
            } catch (er) {
                console.log(er);
            }
        });
    },
});

export default taskReduser.reducer;