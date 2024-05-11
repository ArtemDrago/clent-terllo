import React, { useCallback, useContext, useEffect, useState } from 'react';
import './ColumnTaskList.scss';
import { ColumnTask, TaskItem } from '../../../models/models';
import TaskListItem from '../taskListItem/TaskListItem';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

interface ColumnProps {
    column: ColumnTask,
};

const ColumnTaskList: React.FC<ColumnProps> = ({ column }) => {
    const [bacground, setBackground] = useState('#222');

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({
            name: `dustbin-${column.id.toString()}`,
            column_number: column.id.toString(),
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    useEffect(() => {
        let isActive = canDrop && isOver;
        let backgroundColor = 'transparent';
        if (isActive) {
            backgroundColor = 'var(--main-color)';
        } else if (canDrop) {
            backgroundColor = 'white';
        }
        setBackground(backgroundColor);
    }, [isOver, canDrop]);

    return (
        <div
            ref={drop}
            style={{ background: bacground }}
            data-testid={`dustbin-${column?.id.toString()}`}
            className="column"
            id={column?.id.toString()}
        >
            <div className="column-title">
                {column?.title}
            </div>
            <div className="column-task-list">
                {
                    column.tasks && column.tasks.map((task) =>
                        <TaskListItem
                            task={task}
                            key={task.id.toString()}
                            canDrop={canDrop}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default ColumnTaskList;