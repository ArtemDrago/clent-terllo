import * as React from 'react';
import './DescTaskList.scss';
import { Droppable } from 'react-beautiful-dnd';
import { TaskItem } from '../../../models/models';
import TaskList from './TaskList/TaskList';

interface DescTaskListProps {
    listId: string,
    listType: string,
    quotes: TaskItem[],
    internalScroll: boolean,
    isCombineEnabled: boolean,
    useClone: boolean,
    provided: any,
};

const DescTaskList: React.FC<DescTaskListProps> = ({
    listId, listType, quotes, internalScroll, isCombineEnabled, useClone, provided
}) => {
    return (
        <Droppable
            droppableId={listId}
            type={listType}
            {...provided.droppableProps}
        >
            {(dropProvided, dropSnapshot) => (
                <div
                    ref={dropProvided.innerRef}
                    {...dropProvided.droppableProps}
                    className='task-col'
                >
                    <TaskList quotes={quotes} />
                </div>
            )}
        </Droppable>
    );
};

export default DescTaskList;


