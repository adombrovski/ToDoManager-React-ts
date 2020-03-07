import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ToDoList from "./ToDoList";

configure({adapter: new Adapter()});

describe('<ToDoList />', () => {
    const props: any = {
        list: [
            {
                itemId: 0,
                task: '',
                priority: 'Low',
                status: 'Todo'
            },
            {
                itemId: 1,
                task: '',
                priority: 'Critical',
                status: 'Completed'
            },
            {
                itemId: 2,
                task: '',
                priority: 'Medium',
                status: 'Completed'
            }
        ]
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ToDoList {...props}/>)
    });

    const elDiv = 2;

    it('should render el * toDoList.length (element = div*2) based on props', () => {
        expect(wrapper.find('div')).toHaveLength(elDiv * 3);
    });

    it('should render img based on props.toDoList.status = Todo or Completed', () => {
        expect(wrapper.find({alt: "Completed"})).toHaveLength(2);

        expect(wrapper.find({alt: "Todo"})).toHaveLength(1);
    });

    it('priorityColor() should return specific color for each priority', () => {
        expect(wrapper.findWhere(node =>
            node.key() === '0').children().find('span')
            .get(0).props.style).toEqual({backgroundColor: 'rgba(77, 166, 255, 0.4)'});

        expect(wrapper.findWhere(node =>
            node.key() === '1').children().find('span')
            .get(0).props.style).toEqual({backgroundColor: 'rgba(255, 77, 77, 0.4)'});

        expect(wrapper.findWhere(node =>
            node.key() === '2').children().find('span')
            .get(0).props.style).toEqual({backgroundColor: 'rgba(230, 230, 0, 0.4)'});
    });

});