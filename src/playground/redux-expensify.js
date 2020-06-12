import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

const expensesReducerDefaultState = [];

const expenseReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return ([
                ...state,
                action.expense
            ]);
        case 'DELETE_EXPENSE':
            return (state.filter((stateid) => {
                return stateid.id !== action.expense.id;
            }));
        case 'EDIT_EXPENSE':
            console.log(action.id)
            return (state.map((expense) => {
                if(expense.id === action.id) {
                    // console.log(action.updates)
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            }));
        default:
            return state;
    }
};

const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
   type: 'ADD_EXPENSE',
   expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
   }         
});

const deleteExpense = ({id} = {}) => ({
    type: 'DELETE_EXPENSE',
    expense: {
        id
    }
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    filters: {
        text
    }
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = ( date = undefined) => ({
    type: 'SET_START_DATE',
    date
})

const setEndDate = ( date = undefined) => ({
    type: 'SET_END_DATE',
    date
})

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        console.log(expense.description);
        console.log(text);
        console.log(startDate);
        console.log(endDate);
        console.log(expense.createdAt);
        console.log(sortBy);
        const startDateMatch = typeof startDate !== 'number'|| expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

const filterReducerDefaultState = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.filters.text }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
};
const store = createStore(
    combineReducers ({
        expense: expenseReducer,
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expense, state.filters);
    console.log(visibleExpenses);
    console.log(store.getState());
})

const expenseOne = store.dispatch (addExpense({description: 'tea', amount: 100, createdAt: -2100}));
const expenseTwo = store.dispatch (addExpense({description: 'coffee', amount: 300, createdAt: -1000}));

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
    expenses: [{
        id: 'poiuytyuio',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};
