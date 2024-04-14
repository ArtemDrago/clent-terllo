import { configureStore } from "@reduxjs/toolkit";
import taskReduser from "./redusers/taskReduser";
import userReduser from "./redusers/userReduser";

export const store = configureStore({
    reducer: {
        task: taskReduser,
        user: userReduser,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;