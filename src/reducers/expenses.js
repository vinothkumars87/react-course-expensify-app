const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return ([
                ...state,
                action.expenses
            ]);
        case 'DELETE_EXPENSE':
            return (state.filter((stateid) => {
                return stateid.id !== action.expenses.id;
            }));
        case 'EDIT_EXPENSE':
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