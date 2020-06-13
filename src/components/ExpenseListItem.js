//Export stateless functional component
// description, amount, createdAt

import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import {Link} from 'react-router-dom';


const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
        </Link>
        <p>
        {numeral(amount/100).format('$0,0.oo')}
        - 
        {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
);


export default ExpenseListItem;