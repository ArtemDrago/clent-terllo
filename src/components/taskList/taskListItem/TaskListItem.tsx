import * as React from 'react';
import './TaskListItem.scss';
import { TaskItem } from '../../../models/models';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { changeTaskPosition } from '../../../store/redusers/taskReduser';
import { AuthContext } from '../../../context/context';
import { changeTask } from '../../../store/redusers/asyncTaskReducer';

interface TaskItemProps {
    task: TaskItem,
    canDrop: boolean,
};

interface DropResultProps {
    dropEffect: String,
    name: String,
    column_number: Number | String,
};

const TaskListItem: React.FC<TaskItemProps> = ({ task, canDrop }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const [timer, setTimer] = useState('');
    let date = new Date(Date.parse(task.dataCreate.toString()));
    const [columnId, setColumnId] = useState<Number | null>(null);
    const { hoverItem, setHoverItem } = useContext(AuthContext);
    const state = useAppSelector(state => state.user);

    const [{ opacity, isDragging, column }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { task },
        end: (item, monitor) => {
            const dropResult: DropResultProps | any = monitor.getDropResult()
            if (item && dropResult) {
                if (!dropResult?.column_number) return;
                setColumnId(dropResult?.column_number);
            }
        },
        collect: (monitor: DropResultProps | any) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
            opacity: monitor.isDragging() ? 0.5 : 1,
            column: monitor.getDropResult()?.column_number,
        }),
    }));
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.BOX,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) return;

            setHoverItem(task);
            // console.log(item, index)
            // const dragIndex = item?.index;
            // const hoverIndex = index;
            // // if (_dragIndex === _hoverIndex) return;
            // // dragIndex = item?.index;
            // // hoverIndex = index;
            // if (dragIndex === hoverIndex) return;

            // const hoverBoundingRect = ref.current.getBoundingClientRect();
            // const hoverMiddleY =
            //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // const clientOffset = monitor.getClientOffset();
            // if (clientOffset === null) return;
            // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // if (
            //     dragIndex < hoverIndex && hoverClientY < hoverMiddleY ||
            //     dragIndex > hoverIndex && hoverClientY > hoverMiddleY
            // ) return;
            // console.log(hoverIndex);
        },
    });

    useEffect(() => {
        if (task.timer === 0) {
            setTimer('00:00');
        } else {
            setTimer(task.timer.toString());
        }
    }, []);

    const dropItem = () => {
        if (!task?.id || !columnId) return;
        let data = {
            task_id: task?.id,
            column_number: columnId,
            position_in_column: hoverItem?.positionCollumn,
            oldPosition: task?.positionCollumn,
            oldColumn: task?.collumn,
        };
        dispatch(changeTaskPosition(data));
        dispatch(changeTask({
            task_id: task?.id,
            user_id: state.userId,
            newCollumn: columnId,
            newPositionCollumn: hoverItem?.positionCollumn,
        }))
        setColumnId(null);
        setHoverItem(null);
    };

    drag(drop(ref));

    useEffect(() => {
        dropItem();
    }, [isDragging]);
    //отрисовку элемента вынести в отдельный компонент!
    return (
        <>
            <div
                className={canDrop ? "task-item_wrapper drop-item" : "task-item_wrapper"}
                ref={ref}
                style={{ opacity }}
                data-task-id={`${task.id}`}
            >
                <h4 className="task-item_title">
                    {task.title} - {task.id.toString()} - {task.positionCollumn.toString()}
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
            {
                hoverItem && hoverItem.id === task.id ?
                    'true'
                    :
                    ''
            }
        </>
    );
};

export default TaskListItem;