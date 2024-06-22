import * as React from 'react';
import './DescTask.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TaskItem } from '../../models/models';
import { columnsTask } from '../../utilits/constants';
import DescColumn from './DesctColumn/DesctColumn';
import { changeTaskPosition } from '../../store/redusers/taskReduser';
import { changeTask } from '../../store/redusers/asyncTaskReducer';

interface DescTasksProps {
    withScrollableColumns: any
};

const DescTasks: React.FC<DescTasksProps> = ({ withScrollableColumns }) => {
    const tasks = useAppSelector(state => state.task.tasks);
    const userId = useAppSelector(state => state.user.userId);
    const [columns, setColumns] = useState<{ [key: string]: TaskItem[] }>({});
    const [ordered, setOrdered] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const onDragEnd = (result: any) => {
        let dragItemId = +result?.draggableId;
        let dragPosition = +result?.destination?.index;
        let dragColumn = getColumnId(result?.destination?.droppableId);
        let oldColumn = getColumnId(result?.source?.droppableId);

        if (!dragItemId) return;

        dispatch(changeTaskPosition({
            task_id: dragItemId,
            column_number: dragColumn,
            position_in_column: dragPosition,
            oldColumn: oldColumn,
        }));
        dispatch(changeTask({
            task_id: dragItemId,
            user_id: userId,
            newCollumn: dragColumn,
            newPositionCollumn: dragPosition,
        })).then((res) => {
            console.log(res)
        });
    };

    const getColumnId = (name: string): number | null => {
        let id = null;
        for (let i = 0; i < columnsTask.length; i++) {
            const element = columnsTask[i];
            if (element.title === name) {
                id = element.id;
                break;
            }
        }
        return id;
    };

    useMemo(() => {
        let _column = columnsTask.reduce(
            (previous, column) => ({
                ...previous,
                [column.title]: tasks.filter((task: TaskItem) => task.collumn === column.id)
                    .sort((a, b) => +a.positionCollumn - +b.positionCollumn)
            }),
            {}
        );
        setOrdered(Object.keys(_column));
        setColumns(_column);
    }, [tasks]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={Boolean(innerHeight)}
                isCombineEnabled={withScrollableColumns.isCombineEnabled}
            >
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className='column-list'>
                        {ordered && ordered.map((key, index) => (
                            <DescColumn
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key]}
                                isScrollable={withScrollableColumns}
                                isCombineEnabled={withScrollableColumns.isCombineEnabled}
                                useClone={withScrollableColumns.useClone}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DescTasks;