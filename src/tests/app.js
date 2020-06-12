import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();

//addExpense -> Water bill
//addExpense -> Gas bill
//setTextFilter -> bill (2 items) -> water 1 item
//getVisibleExpenses -> print visible ones to screen

store.dispatch(addExpense({description: 'Water Bill', amount: 1500}));
store.dispatch(addExpense({description: 'Gas Bill', createdAt: 1800}));
store.dispatch(addExpense({description: 'Rent', amount: 1200}));

const state = store.getState();
console.log(state);
// console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
ReactDOM.render(jsx , document.getElementById('app'));
