import * as React from 'react';
import './TaskListItem.scss';
import { TaskItem } from '../../../models/models';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';


interface TaskItemProps {
    task: TaskItem,
};

const TaskListItem: React.FC<TaskItemProps> = ({ task }) => {
    const [timer, setTimer] = useState('');
    let date = new Date(Date.parse(task.dataCreate.toString()));

    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: `Let's make <Card text='Write the docs' /> draggable!`,
            item: {},
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }),
        []
    )

    useEffect(() => {
        if (task.timer === 0) {
            setTimer('00:00');
        } else {
            setTimer(task.timer.toString());
        }
    }, []);

    return (
        <div
            className="task-item_wrapper"
            ref={dragRef}
            style={{ opacity }}
        >
            <h4 className="task-item_title">
                {task.title}
            </h4>
            <div className="task-item_footer">
                <div className="task-item_timer">
                    {timer}
                </div>
                <div className="task-item_date">
                    {date.toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default TaskListItem;