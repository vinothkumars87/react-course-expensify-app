import {addExpense, deleteExpense, editExpense} from '../../actions/expenses'

test('should setup remove expense action object', () => {
    const action = deleteExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'DELETE_EXPENSE',
        expenses: { id: '123abc' }
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'a sample note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {"note":'a sample note'}
    })
});

test('should setup add expense action object with give values', () => {
    const expenseData = {
        description: 'a simple note',
        amount: 91500,
        createdAt: 1000,
        note: 'a sample note'
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            description: '',
            amount: 0,
            note: '',
            createdAt: 0,
            id: expect.any(String)
        }
    })
})