import uuid from 'uuid';

export const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
   type: 'ADD_EXPENSE',
   expenses: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
   }         
});

export const deleteExpense = ({id} = {}) => ({
    type: 'DELETE_EXPENSE',
    expenses: {
        id
    }
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});