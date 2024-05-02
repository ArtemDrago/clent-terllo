import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ColumnTask, TaskItem } from '../../models/models';
import './TaskList.scss';
import { useEffect, useState } from 'react';
import { columnsTask } from '../../utilits/constants';
import ColumnTaskList from './columnTaskList/ColumnTaskList';

function TaskList() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.task.tasks);
    const [column, setColumn] = useState<ColumnTask[]>();

    useEffect(() => {
        let column = columnsTask;

        if (!!tasks && tasks.length !== 0) {
            column.forEach((column: ColumnTask) => {
                column.tasks = tasks.filter((task: TaskItem) => task.collumn === column.id);
            });
        }
        setColumn(column);
    }, [tasks]);

    return (
        <section className='task-list_wrapper'>
            {column && column.map((column) =>
                <ColumnTaskList column={column} key={column.id} />
            )}
        </section>
    );
};

export default TaskList;