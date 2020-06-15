import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../selectors/expense-total';

test('should correctly render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={23512340987}/>);
    expect(wrapper).toMatchSnapshot();
});