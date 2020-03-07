import React from 'react';
import {ItemId, Severity, Status} from "../../types/ToDoListManagerTypes";
import ToDoSVG from '../../images/check-box-iconsrepo-com-BLACK.svg';
import ToDoCompletedSVG from '../../images/check-box-iconsrepo-com-GREEN.svg';
import RemoveToDo from '../../images/delete-button-iconsrepo-com.svg';
import {IToDoItem} from "../../containers/toDoListManager/newToDoItem/NewToDoItem";

interface IToDoList {
    list: IToDoItem[]
    removeItem: (id: ItemId) => void
    completeItem: (id: ItemId) => void
}

const ToDoList: React.FC<IToDoList> = (props) => {
    const [COMPLETED, TODO] = ['Completed', 'Todo'];

    const displayToDoStatus = (status: Status, id: ItemId) => (
        status === COMPLETED ?
            <img src={ToDoCompletedSVG} alt={COMPLETED}/> : <img src={ToDoSVG} alt={TODO}
                                                                 onClick={() => props.completeItem(id)}/>
    );

    const priorityColor = (p: Severity) => {
        if (p === 'Critical') return 'rgba(255, 77, 77, 0.4)';
        if (p === 'Medium') return 'rgba(230, 230, 0, 0.4)';
        if (p === 'Low') return 'rgba(77, 166, 255, 0.4)';
    };

    return (
        <>
            {
                    props.list.map(el => (
                        <div className={'row mb-3'} key={el.itemId}>
                            {
                                displayToDoStatus(el.status, el.itemId)
                            }

                            <div className={'col d-flex align-items-center'}>{el.task}</div>

                            <span className={'priority d-flex justify-content-center align-items-center mr-md-3'}
                                  style={{
                                      backgroundColor: priorityColor(el.priority)
                                  }}>{el.priority}</span>

                            <img src={RemoveToDo} alt={'RemoveToDo'}
                                 onClick={() => props.removeItem(el.itemId)}/>
                        </div>
                    )
                )
            }
        </>
    )
};

export default ToDoList;