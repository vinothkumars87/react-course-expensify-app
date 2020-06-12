import React from 'react';
import {connect} from 'react-redux';
import {editExpense, deleteExpense} from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onClick = () => {
    this.props.deleteExpense({id : this.props.expense.id});
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
      <ExpenseForm 
        expense={this.props.expense}
        onSubmit={this.onSubmit}
      />
      <button onClick= {this.onClick}>
        Remove
      </button>
    </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expense.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  deleteExpense: (data) => dispatch(deleteExpense(data))
});

export default connect (mapStateToProps, mapDispatchToProps)(EditExpensePage);