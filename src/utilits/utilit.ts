import axios from "axios";
import { UserFormState } from "../models/models";
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