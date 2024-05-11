import { createSlice } from "@reduxjs/toolkit";
import { TaskItem, TaskState } from "../../models/models";
import { changeTask, getAllUserTasks } from "./asyncTaskReducer";
import { swapElementsInCollumn } from "../../utilits/utilit";

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
            let oldPosition = action.payload?.oldPosition;

            let tasksColumn = state.tasks
                .filter(task => task.collumn === newColumn)
                .sort((a, b) => +a.positionCollumn - +b.positionCollumn);
            let task = state.tasks.filter(task => task.id === taskId)[0];

            if (!taskId || !newColumn || !task) return;
            if (!newPosition) {
                if (oldColumn !== newColumn) {
                    newPosition = +tasksColumn[tasksColumn.length - 1].positionCollumn;
                }
            }
            if (
                newPosition !== oldPosition ||
                newColumn !== oldColumn
            ) {
                task.collumn = newColumn;
                task.positionCollumn = newPosition;
            }
            let arr = swapElementsInCollumn(tasksColumn, task, newPosition);

            for (let i = 0; i < arr.length; i++) {
                arr[i].positionCollumn = i + 1;
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