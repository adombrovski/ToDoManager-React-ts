import {IToDoItem} from "../containers/toDoListManager/newToDoItem/NewToDoItem";
import {ItemId} from "../types/ToDoListManagerTypes";
import {PRIORITY} from "../components/priority/Priority";
import {Index, ObjProperty} from "../types/GeneralTypes";


export const removeArrayObjectById = (arr: IToDoItem[], id: ItemId) => arr.filter(el => el.itemId !== id);


export const orderArrById = (arr: IToDoItem[]) => arr.sort((a, b) => (a.itemId - b.itemId));


export const orderArrByPriority = ((arr: IToDoItem[]) => {
    const order = PRIORITY.reduce((r: {}, p: ObjProperty, i: Index) => Object.assign(r, {[p]: i}), {});

    return arr.sort((a: IToDoItem, b: IToDoItem) => order[a.priority] - order[b.priority]);
});


export const updateArrObjectById = (arr: IToDoItem[], p: ObjProperty, id: ItemId, v: string | number) => (
    arr.map((el: IToDoItem) => el.itemId === id ? {...el, [p]: v} : el)
);



