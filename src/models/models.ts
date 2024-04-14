export interface TaskState {
    state: Number[],
};
export interface UserState extends UserFormState {
    userId: Number | null,
};

export interface UserFormState {
    name: String | null,
    password?: String | null,
    mail?: String | null,
};