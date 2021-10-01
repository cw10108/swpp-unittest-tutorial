import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react'
const stubTodos = [
    {
        year:2021,
        month:10,
    }
]
describe("<Calendar />", ()=>{
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find(Table);
        expect(wrapper.length).toBe(1);
    });
    it('should have right max dates for each month', () => {
        const component = mount(<Calendar year={2021} month={10} todos={stubTodos}/>);
        // console.log(component.debug());
        const wrapper = component.find('.date');
        expect(wrapper.length).toEqual(30);
    });
})
