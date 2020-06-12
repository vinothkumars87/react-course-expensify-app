import expenseReducers from '../../reducers/expenses';
import expense from '../fixtures/expense';


test('should set default state', () => {
    const state = expenseReducers(undefined, { type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'DELETE_EXPENSE',
        expenses: {
            id: expense[1].id
        }
    };
    const state = expenseReducers(expense, action);
    expect(state).toEqual([expense[0],expense[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'DELETE_EXPENSE',
        expenses: {
            id: '12'
        }
    };
    const state = expenseReducers(expense, action);
    expect(state).toEqual([expense[0],expense[1],expense[2]]);
});

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expenses: {
            id:'4',
            description: 'Gas Bill',
            note: '',
            amount: 21000,
            createdAt: 0    
            }
        }
    const state = expenseReducers(expense, action);
    expect(state).toEqual([expense[0],expense[1],expense[2],action.expenses]);
});

test('should edit expense', () => {
    const id = expense[1].id;
    const amount = 2500;
    const action = {
        type: 'EDIT_EXPENSE',
        id,
        updates: {
            description: 'Gas Bill'
            }
        }
    const state = expenseReducers(expense, action);
    expect(state[1].description).toEqual('Gas Bill');
});

test('should edit expense if id did not match', () => {
    const id = '3333';
    const amount = 2500;
    const action = {
        type: 'EDIT_EXPENSE',
        id,
        updates: {
            description: 'Gas Bill'
            }
        }
    const state = expenseReducers(expense, action);
    expect(state[1].description).toEqual('Rent');
});
