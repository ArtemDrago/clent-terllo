import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewUser, autoriseUser } from "../../utilits/utilit";
import { UserFormState } from "../../models/models";

export const saveUserData = createAsyncThunk(
    "user/saveUserData",
    async (user: UserFormState) => {
        let res = await addNewUser(user);
        return res;
    }
);
export const autoriseUserData = createAsyncThunk(
    "user/autoriseUserData",
    async (user: UserFormState) => {
        let res = await autoriseUser(user);
        return res;
    }
);