import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ColumnTask, TaskItem } from '../../models/models';
import './TaskList.scss';
import { useEffect, useState } from 'react';
import { columnsTask } from '../../utilits/constants';
import ColumnTaskList from './columnTaskList/ColumnTaskList';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function TaskList() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.task.tasks);
    const [column, setColumn] = useState<ColumnTask[]>();

    useEffect(() => {
        let _column = columnsTask;

        if (!!tasks && tasks.length !== 0) {
            _column.forEach((column: ColumnTask) => {
                column.tasks = tasks.filter((task: TaskItem) => task.collumn === column.id);
                column.tasks.sort((a, b) => +a.positionCollumn - +b.positionCollumn);
            });
        }
        setColumn(_column);
    }, [tasks, column]);

    return (
        <section
            className='task-list_wrapper'
        >
            <DndProvider backend={HTML5Backend}>
                {column && column.map((column) =>
                    <ColumnTaskList column={column} key={column.id} />
                )}
            </DndProvider>
        </section>
    );
};

export default TaskList;