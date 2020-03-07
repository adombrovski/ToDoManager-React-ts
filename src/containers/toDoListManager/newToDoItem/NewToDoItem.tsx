import React, {useState} from 'react';
import Priority from "../../../components/priority/Priority";
import {ItemId, Severity, Status, Task} from "../../../types/ToDoListManagerTypes";
import './NewToDoItem.css';
import {ObjProperty} from "../../../types/GeneralTypes";

interface INewToDoItemProps {
    addNewItem: (e: React.FormEvent<HTMLFormElement>, taskItem: IToDoItem) => void
}

export interface IToDoItem {
    itemId: ItemId
    task: Task
    priority: Severity
    status: Status
}

const NewToDoItem: React.FC<INewToDoItemProps> = (props) => {
    const initNewToDoItem = {
        itemId: 0,
        task: '',
        priority: '',
        status: 'Todo'
    };


    const [newToDoItem, setNewToDoItem] = useState<IToDoItem>(initNewToDoItem);

    const [alert, setAlert] = useState<boolean>();


    const setObjPropByKey = (v: Severity, p: ObjProperty) => {
        setNewToDoItem(
            (ps: IToDoItem) => ({
                ...ps, [p]: v
            })
        );
    };


    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setObjPropByKey(e.currentTarget.value, 'task');


    const submitAndToDoCleanUp = (e: React.FormEvent<HTMLFormElement>) => {
        props.addNewItem(e, newToDoItem);
        setNewToDoItem(initNewToDoItem);
        setAlert(false);
    };


    const handelSetPriority = (p: Severity) => {
        setObjPropByKey(p, 'priority');
    };


    const preventSubmitting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert(true);
    };


    return (
        <div className={'row mt-2'}>
            {
                alert && <div style={{opacity: '0.4'}} className="row col alert alert-danger ml-1 mr-1" role="alert">
                    Please add description and select priority!
                </div>
            }

            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                //Prevent submitting if required info is not added
                (newToDoItem.priority && newToDoItem.task) ? submitAndToDoCleanUp(e) : preventSubmitting(e);
            }} className={'form row col-12 p-1'}>
                        <textarea
                            className={'col-12 col-sm-10'}
                            value={newToDoItem.task}
                            onChange={onInputChange}
                            maxLength={50}/>

                <button className={'col ml-sm-1 mt-2 mt-sm-0'}>Add</button>
            </form>

            <Priority setValue={handelSetPriority} toDoItem={newToDoItem}/>
        </div>
    )
};

export default NewToDoItem;