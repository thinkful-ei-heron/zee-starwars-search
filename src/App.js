import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from './components/history';
import Search from './components/Search';
import Results from './components/Results';
import ErrorPage from './components/ErrorPage.js';
import Loading from './components/loading';
import starWars from './starwars.svg';
import './App.css';

export default class App extends Component {
  constructo(props) {
    super(props);

    this.BASE_URL= 'https://swapi.co/api/';
    this.state = {
      data: [],
      searching: false
    };
  }
  
  componentDidMount() {
    history.push('/');
  }

  search = (searchInput, filter) => {
    history.push('/');
    this.setState({ searching: true });
    fetch(`${this.BASE_URL}${filter}${searchInput ? '/?search=' + searchInput : ''}`)
      .then(res => res.json())
      .then(data => {
        if(data.next)
          this.getAll(data).then(results => {
            let realResults = [];
            results.forEach(arr => arr.forEach(item => realResults.push(item)));
            this.setState({ data: realResults, searching: false });
            history.push(`/results/${filter}`);
          });
        else {
          this.setState({ data: data.results, searching: false });
          history.push(`/results/${filter}`);
        }
      })
      .catch(err => console.log(err));
  };

  getAll(data, results = []) {
    if(!data.next) return results;

    return fetch(`${data.next}`)
      .then(res => res.json())
      .then(newData => {
        results = [...results, newData.results];
        return this.getAll(newData, results);
      })
      .catch(err => console.log(err));
  }

  routeByType() {
    
  }
}

