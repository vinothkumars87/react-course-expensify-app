import React from 'react';
import ExpenseListItem from '../../components/ExpenseListItem';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import expenses from '../fixtures/expense';


test('should render ExpenseListItem with expense', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});