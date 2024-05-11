export interface TaskState {
    tasks: TaskItem[],
};
export interface TaskItem {
    id: Number,
    user_id: Number,
    title: String,
    description: String,
    timer: Number | String,
    dataCreate: Date | String,
    dataExpiration: Date | String,
    deadline: Date | String,
    collumn: Number,
    positionCollumn: Number,
    createdAt: Date | String,
    updatedAt: Date | String
};

export interface ColumnTask {
    id: number;
    title: string;
    tasks: TaskItem[];
};

export interface ChangeTask {
    user_id: Number | null,
    task_id: Number,
    newTitle?: String,
    newDescription?: String,
    newTimer?: Number,
    newDataExpiration?: String,
    newDeadline?: String,
    newCollumn?: Number | null,
    newPositionCollumn?: Number | null,
};

export enum TaskTypes {
    TaskItem,
    TaskState,
    ColumnTask,
};

export interface UserState extends UserFormState {
    userId: Number | null,
};

export interface UserFormState {
    name: String | null,
    password?: String | null,
    mail?: String | null,
};