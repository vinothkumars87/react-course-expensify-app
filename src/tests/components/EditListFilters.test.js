import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import toJSON from 'enzyme-to-json';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, alternateFilters} from '../fixtures/filters';

let setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters
        setTextFilter={setTextFilter}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
        filters={filters}
        />);
    
});

test('should render ExpenseListFilter correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseListFilter with alternate filter value correctly', () => {
    wrapper.setProps({
        filters: alternateFilters
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
});

//should handle text change

test('should handle onTextChange', () => {
    const value = 'Vinoth';
    wrapper.find('input').at(0).simulate('change',{target : {value}});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort By date', () => {
    const value = 'date';
    wrapper.find('select').at(0).simulate('change', {target: {value}});
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort By amount', () => {
    const value = 'amount';
    wrapper.find('select').at(0).simulate('change', {target: {value}});
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});