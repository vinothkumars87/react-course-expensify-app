import moment from 'moment';

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}


const alternateFilters = {
    text: 'Water Bill',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
}

export {filters, alternateFilters};