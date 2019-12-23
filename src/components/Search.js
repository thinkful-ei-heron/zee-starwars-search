import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    searchTerm: '',
    filter: 'films'
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state.searchTerm, this.state.filter);
  }

  render() {
    return (
      <form className="search" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="searchTerm" className="searchTerm">Search for:</label>
        <select name="filter" id="filter" onChange={e => this.setState({ filter: e.target.value })}>
          <option value="films">Films</option>
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="species">Species</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
        </select>
        <label className="filterLabel" htmlFor="filter">
          Filter search by :
        </label>
        <input
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="ex: Luke Skywalker"
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}