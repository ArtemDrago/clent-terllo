import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "../../models/models";
import { changeTask, getAllUserTasks } from "./asyncTaskReducer";

const initialState: TaskState = {
    tasks: [],
};

export const taskReduser = createSlice({
    name: "services",
    initialState,

    reducers: {
        changeTaskPosition: (state, action) => {
            let taskId = action.payload?.task_id;
            let newColumn = +action.payload?.column_number;
            let newPosition = action.payload?.position_in_column;
            let oldColumn = action.payload?.oldColumn;

            let tasksColumn = state.tasks
                .filter(task => task.collumn === newColumn && task.id !== taskId)
                .sort((a, b) => +a.positionCollumn - +b.positionCollumn);
            let task = state.tasks.filter(task => task.id === taskId)[0];

            if (!taskId || !newColumn || !task) return;

            if (newColumn !== oldColumn) {
                task.collumn = newColumn;
                task.positionCollumn = newPosition;
            }
            tasksColumn.splice(newPosition, 0, task);

            for (let i = 0; i < tasksColumn.length; i++) {
                tasksColumn[i].positionCollumn = i;
            }
        },
    },
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
        builder.addCase(changeTask.fulfilled, (state, action) => {
            try {
                let res = action.payload;
                console.log(res?.message);
            } catch (er) {
                console.log(er);
            }
        });
    },
});



export const { changeTaskPosition } = taskReduser.actions;
export default taskReduser.reducer;