import React from 'react';
import {EditExpensePage} from '../../components/EditExpensePage';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import expenses from '../fixtures/expense';


let editExpense, deleteExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    deleteExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage editExpense={editExpense} deleteExpense={deleteExpense} history={history} expense={expenses[2]} />);
    
});


test('should render EditExpensePage correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle onClick', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(deleteExpense).toHaveBeenLastCalledWith({id: expenses[2].id});
});

