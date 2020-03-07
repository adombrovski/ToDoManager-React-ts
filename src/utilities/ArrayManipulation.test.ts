import {orderArrByPriority, orderArrById, removeArrayObjectById} from './ArrayManipulation';

const testData = [
    {itemId: 2, task: "", priority: "Medium", status: "Completed"},
    {itemId: 0, task: "", priority: "Low", status: "Completed"},
    {itemId: 1, task: "", priority: "Critical", status: "Completed"}
];

it('Should return array with removed object', () => {
    expect(removeArrayObjectById(testData, 1).length).toBe(testData.length - 1);
});


it('Should return array sorted by priority', () => {
    const expectedData = [
        {itemId: 1, task: "", priority: "Critical", status: "Completed"},
        {itemId: 2, task: "", priority: "Medium", status: "Completed"},
        {itemId: 0, task: "", priority: "Low", status: "Completed"}
    ];

    expect(orderArrByPriority(testData)).toStrictEqual(expectedData);
});

it('Should return array sorted by id', () => {

    const expectedData = [
        {itemId: 0, task: "", priority: "Low", status: "Completed"},
        {itemId: 1, task: "", priority: "Critical", status: "Completed"},
        {itemId: 2, task: "", priority: "Medium", status: "Completed"}
    ];

    expect(orderArrById(testData)).toStrictEqual(expectedData);
});