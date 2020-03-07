import React from 'react';
import {ObjProperty} from "../../types/GeneralTypes";
import {Status} from "../../types/ToDoListManagerTypes";
import {IToDoListState} from "../../containers/toDoListManager/ToDoListManager";
import './FilterBar.css';

export interface IFilterBar {
    label: string
    property: ObjProperty
    onClick: (property: ObjProperty, el: Status) => void
    elements: Status[]
    state: IToDoListState
}

const FilterBar: React.FC<IFilterBar> = (props) => {
    const setSelectedOrderColor = (el: Status) => {
        const COLOR = 'rgba(51, 119, 255, 0.5)';

        if (props.state.taskByStatus === el) return COLOR;
        if (props.state.orderBy === el) return COLOR;
    };

    return (
        <>
            {props.label + ':'}
            {
                props.elements.map(el => (
                    <div key={el} className={'orderBy'}  onClick={() => props.onClick(props.property, el)}
                         style={
                             {backgroundColor: setSelectedOrderColor(el)}
                         }>{el}</div>
                ))
            }
        </>
    )
};

export default FilterBar;