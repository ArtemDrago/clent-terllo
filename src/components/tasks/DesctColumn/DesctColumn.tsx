import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './DescColumn.scss';
import DescTaskList from '../DescTaskList/DesctTaskList';
import { TaskItem } from '../../../models/models';

interface DescColumnProps {
    index: number,
    title: string,
    quotes: TaskItem[],
    isScrollable: boolean,
    isCombineEnabled: boolean,
    useClone: Function,
};

const DescColumn: React.FC<DescColumnProps> = ({
    index, title, quotes, isCombineEnabled, isScrollable, useClone
}) => {
    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} className='column'>
                    <h4 className="column-title" >
                        <div {...provided.dragHandleProps}>
                            {title}
                        </div>
                    </h4>
                    <DescTaskList
                        listId={title}
                        listType="QUOTE"
                        quotes={quotes}
                        internalScroll={isScrollable}
                        isCombineEnabled={Boolean(isCombineEnabled)}
                        useClone={Boolean(useClone)}
                        provided={provided}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default DescColumn;