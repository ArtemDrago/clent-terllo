import React from 'react';
import './ColumnTaskList.scss';
import { ColumnTask } from '../../../models/models';
import TaskListItem from '../taskListItem/TaskListItem';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface ColumnProps {
    column: ColumnTask,
}

const ColumnTaskList: React.FC<ColumnProps> = ({ column }) => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                className="column"
                id={column.id.toString()}
            >
                <div className="column-title">
                    {column.title}
                </div>
                <div className="column-task-list">
                    {
                        column.tasks && column.tasks.map((task) =>
                            <TaskListItem task={task} key={task.id.toString()} />
                        )
                    }
                </div>
            </div>
        </DndProvider>
    );
}

export default ColumnTaskList;