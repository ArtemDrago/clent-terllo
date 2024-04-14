import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../models/models";
import { autoriseUserData, saveUserData } from "./asyncUserReducer";

const initialState: UserState = {
    name: null,
    mail: null,
    userId: null,
};

export const taskReduser = createSlice({
    name: "user",
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveUserData.fulfilled, (state, action) => {
            try {
                let res = action.payload;
                state.name = res.name;
                state.userId = res.id;
                state.mail = res.userMail;

                if (res.hasOwnProperty('message')) {
                    alert(res.message);
                } else {
                    localStorage.setItem("user", JSON.stringify({
                        name: res.name,
                        userId: res.userId,
                        mail: res.userMail,
                        password: res.password,
                    }));
                    localStorage.setItem("auth", JSON.stringify(true));
                }
            } catch (er) {
                console.log(er);
            }
        });
        builder.addCase(autoriseUserData.fulfilled, (state, action) => {
            try {
                let res = action.payload;
                state.name = res.name;
                state.userId = res.id;
                state.mail = res.userMail;

                if (res.hasOwnProperty('message')) {
                    alert(res.message);
                } else {
                    localStorage.setItem("user", JSON.stringify({
                        name: res.name,
                        userId: res.userId,
                        mail: res.userMail,
                        password: res.password,
                    }));
                    localStorage.setItem("auth", JSON.stringify(true));
                }
            } catch (er) {
                console.log(er);
            }
        });
    }
});

export default taskReduser.reducer;