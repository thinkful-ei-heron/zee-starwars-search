import React, { Component } from 'react';

export default class Search extends Component {
    state = {
        searchInput: '',
        filter: 'films'
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.search(this.state.searchInput,
            this.state.filter);
    }

    render() {
        return (
            <form className='search' onSubmit={e => this.handleSubmit(event)}>
                <label htmlFor='searchInput'>Search for:</label>
                <select name='filter' id='filter' onChange={e => this.setState({
                    filter: e.target.value
                })}>
                    <option value='films'>Films</option>
                    <option value='people'>People</option>
                    <option value='planets'>Planets</option>
                    <option value='species'>Species</option>
                    <option value='starships'>Starships</option>
                    <option value='vehicles'>Vehicles</option>
                </select>
                <label className='filterItems' htmlFor='filter'>
                    Filter search by:
            </label>
                <input
                    type='text'
                    name='searchInput'
                    id='searchInput'
                    placeholder='ex. Luke Skywalker'
                    onChange={e => this.setState({
                        searchInput: e.target.value
                    })}
                />
                <button type='submit'>Submit</button>
            </form>
        );
    }
}