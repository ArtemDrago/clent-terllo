import React, { useEffect, useState } from "react";
import { TaskItem } from "../../../../models/models";
import { Draggable } from "react-beautiful-dnd";
import './TaskList.scss';

interface TaskListProps {
    quotes: TaskItem[],
};
const TaskList: React.FC<TaskListProps> = React.memo(function TaskList({ quotes }) {
    const [timer, setTimer] = useState('00:00');

    // useEffect(() => {
    //     if (task.timer === 0) {
    //         setTimer('00:00');
    //     } else {
    //         setTimer(task.timer.toString());
    //     }
    // }, []);
    return quotes.map((quote, index) => (
        <Draggable key={quote.id.toString()} draggableId={quote.id.toString()} index={index}>
            {(dragProvided, dragSnapshot) => (
                <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className="task-item_wrapper"
                >
                    <h4 className="task-item_title">
                        {quote.title} - {quote.id.toString()} - {quote?.positionCollumn?.toString()}
                    </h4>
                    <div className="task-item_footer">
                        <div className="task-item_timer">
                            {timer}
                        </div>
                        <div className="task-item_date">
                            {new Date(Date.parse(quote.dataCreate.toString())).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    ));
});
export default TaskList;