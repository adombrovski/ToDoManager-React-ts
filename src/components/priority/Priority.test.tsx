import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Priority from "./Priority";

configure({adapter: new Adapter()});

describe('<Priority />', () => {
    const props: any = {
        toDoItem: {
            itemId: 0,
            task: '',
            priority: 'Critical',
            status: 'Todo'
        }
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Priority {...props}/>)
    });


    it('Should render 3 elements', () => {
        expect(wrapper.find('div')).toHaveLength(3);
    });


    it('Color based on state status', () => {
        expect(wrapper.findWhere(node => node.key() === 'Critical')
            .get(0).props.style).toEqual({backgroundColor: "rgba(51, 167, 176, 0.25)"});

        expect(wrapper.findWhere(node => node.key() === 'Low')
            .get(0).props.style).toEqual({backgroundColor: ""});
    });
});
