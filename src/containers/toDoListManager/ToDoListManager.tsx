import React, {useEffect, useState} from 'react';
import './ToDoListManager.css';
import NewToDoItem, {IToDoItem} from "./newToDoItem/NewToDoItem";
import {Counter, ItemId, OrderBy, Status, TaskByStatus} from "../../types/ToDoListManagerTypes";
import {
    orderArrByPriority,
    orderArrById,
    removeArrayObjectById,
    updateArrObjectById
} from "../../utilities/ArrayManipulation";
import ToDoList from "../../components/toDoList/ToDoList";
import FilterBar from "../../components/filterBar/FilterBar";
import {ObjProperty} from "../../types/GeneralTypes";

export interface IToDoListState {
    toDoList: IToDoItem[]
    counter: Counter,
    orderBy: OrderBy,
    taskByStatus: TaskByStatus
}


const ToDoListManager: React.FC = () => {
    const [toDoListState, setToDoListState] = useState<IToDoListState>({
            toDoList: [],
            counter: 0,
            orderBy: 'Id',
            taskByStatus: 'All'
        }
    );

    //Retrieve local storage, this effect will be executed once after mount
    useEffect(() => {
        //Local storage
        const toDoData: any = localStorage.getItem('toDoData');

        toDoData && setToDoListState(JSON.parse(toDoData));
    }, []);


    //Set local storage, this effect will be executed after each render
    useEffect(() => localStorage.setItem('toDoData', JSON.stringify(toDoListState)));


    const evaluateOrder = (state: IToDoListState, arr: IToDoItem[]) =>
        state.orderBy === 'Id' ? orderArrById(arr) : orderArrByPriority(arr);


    const sortByOrderEvaluator = () => {
        setToDoListState(
            (ps: IToDoListState) => (
                {
                    ...ps,
                    toDoList: evaluateOrder(ps, ps.toDoList)
                }
            )
        );
    };


    const setToDoListStatePropByKey = (p: ObjProperty,
                                       v: Counter | TaskByStatus | Status | IToDoItem[]) => {
        setToDoListState(
            (ps: IToDoListState) => (
                {
                    ...ps,
                    [p]: v
                }
            )
        );
    };


    const setToDoArrByOrderEvaluator = (arr: IToDoItem[]) => {
        setToDoListState(
            (ps: IToDoListState) => (
                {
                    ...ps,
                    toDoList: evaluateOrder(ps, arr)
                }
            )
        );
    };


    const handelAddToDoItem = (e: React.FormEvent<HTMLFormElement>, taskItem: IToDoItem) => {
        //Prevent standard behavior on submit event
        e.preventDefault();

        setToDoArrByOrderEvaluator([...toDoListState.toDoList, {...taskItem, itemId: toDoListState.counter}]);

        setToDoListStatePropByKey('counter', toDoListState.counter + 1);
    };


    const handelRemoveTask = (id: ItemId) =>
        setToDoListStatePropByKey('toDoList', removeArrayObjectById(toDoListState.toDoList, id));


    const handelCompleteTask = (id: ItemId) =>
        setToDoListStatePropByKey('toDoList', updateArrObjectById(toDoListState.toDoList, 'status', id, 'Completed'));


    const handelSort = (p: ObjProperty, s: Status) => {
        setToDoListStatePropByKey(p, s);
        p === 'orderBy' && sortByOrderEvaluator();
    };

    const taskByStatus = (list: IToDoItem[]) => (
        (toDoListState.taskByStatus === 'Completed' || toDoListState.taskByStatus === 'Todo') ?
            list.filter(el => el.status === toDoListState.taskByStatus) : list
    );


    const fbBSPosition = 'col d-flex align-items-center justify-content-center';

    return (
        <div className={'container'}>
            <NewToDoItem
                addNewItem={handelAddToDoItem}/>

            <div className={'row mb-3 mt-3'}>
                <div className={fbBSPosition}>
                    <FilterBar
                        label={'Display'}
                        property={'taskByStatus'}
                        onClick={handelSort}
                        elements={['Todo', 'Completed', 'All']}
                        state={toDoListState}/>
                </div>
                <div className={fbBSPosition}>
                    <FilterBar
                        label={'Order by'}
                        property={'orderBy'}
                        onClick={handelSort}
                        elements={['Priority', 'Id']}
                        state={toDoListState}/>
                </div>
            </div>

            <ToDoList
                list={
                    taskByStatus(toDoListState.toDoList)
                }
                removeItem={handelRemoveTask}
                completeItem={handelCompleteTask}/>
        </div>
    )
};

export default ToDoListManager;