import React, { Component } from 'react';

export default class Films extends Component {
    let keys = Object.keys(props);

    return keys.map(key => {
        return (
            <li>
                <span className='property'>{key}:</span>
                {props[key]}
            </li>
        );
    });
