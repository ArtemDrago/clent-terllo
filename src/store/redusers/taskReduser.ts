import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "../../models/models";
// import { ServiceCategories, CategoiesServiceList } from "./state";

const initialState: TaskState = {
    state: [1, 2, 3],
};

export const taskReduser = createSlice({
    name: "services",
    initialState,

    reducers: {

    },
});

export default taskReduser.reducer;