import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpenseTool from '../selectors/expense-total';

export const ExpensesSummary = (props) => {
    const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(props.expensesTotal / 100).format('$0,0.00');
    
    return(
        <div>
            <h1>Viewing {props.expenseCount} {expenseWord} totalling {formattedExpensesTotal} </h1>
        </div>
    )
};

const mapStateToProps = (state) => {

    const visibleExpenses = getVisibleExpenses(state.expense, state.filters);
    
    return ({
        expenseCount: (getVisibleExpenses(state.expense, state.filters)).length,
        expensesTotal: selectExpenseTool(getVisibleExpenses(state.expense, state.filters))
    });
};

export default connect (mapStateToProps) (ExpensesSummary);