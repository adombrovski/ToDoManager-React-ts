import React from 'react';
import {Severity} from "../../types/ToDoListManagerTypes";
import {IToDoItem} from "../../containers/toDoListManager/newToDoItem/NewToDoItem";

export interface IPriority {
    setValue: (value: Severity) => void
    toDoItem: IToDoItem
}

export const PRIORITY = ['Critical', 'Medium', 'Low'];

const Priority: React.FC<IPriority> = (props) => (
    <>
        {
            PRIORITY.map((el: Severity) => (
                <div className={'setPriority col d-flex align-items-center justify-content-center col m-1'}
                     key={el}
                     onClick={() => props.setValue(el)}
                     style={{backgroundColor: (props.toDoItem.priority === el) ? 'rgba(51, 167, 176, 0.25)' : ''}}>{el}</div>
            ))
        }
    </>
);

export default Priority;