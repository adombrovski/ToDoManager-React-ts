import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilterBar from "./FilterBar";

configure({adapter: new Adapter()});

describe('<FilterBar />', () => {
    const props: any = {
        label: '',
        property: '',
        onClick: () => {
        },
        elements: ['Todo', 'Completed', 'All'],
        state: {
            taskByStatus: '',
            orderBy: ''
        }
    };

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<FilterBar {...props}/>);
    });

    it('Should render 3 elements', () => {
        expect(wrapper.find('div')).toHaveLength(props.elements.length)
    });

    const bcColor = {backgroundColor: 'rgba(51, 119, 255, 0.5)'};
    const bcUndef = {backgroundColor: undefined};


    it('Color based on state taskByStatus', () => {
        const nextProps = {
            ...props,
            state: {
                ...props.state,
                taskByStatus: 'Todo'
            }
        };

        expect(wrapper.setProps({...nextProps})
            .findWhere(node => node.key() === 'Todo').get(0).props.style).toEqual(bcColor);

        expect(wrapper.setProps({...nextProps})
            .findWhere(node => node.key() === 'All').get(0).props.style).toEqual(bcUndef);

    });

    it('Color based on state orderBy', () => {
        const nextProps = {
            ...props,
            elements: ['Id', 'Priority'],
            state: {
                ...props.state,
                orderBy: 'Id'
            }
        };

        expect(wrapper.setProps({...nextProps})
            .findWhere(node => node.key() === 'Id').get(0).props.style).toEqual(bcColor);

        expect(wrapper.setProps({...nextProps})
            .findWhere(node => node.key() === 'Priority').get(0).props.style).toEqual(bcUndef);
    });
});