import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import history from './components/history';
import Search from './components/Search';
import Results from './components/Results';
import ErrorPage from './components/ErrorPage.js';
import Loading from './components/loading';
// import starWars from './starwars.svg';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.BASE_URL = 'https://swapi.co/api/';
    this.state = {
      data: [],
      searching: false
    };
  }

  componentDidMount() {
    history.push('/');
  }

  search = (searchTerm, filter) => {
    history.push('/');
    this.setState({ searching: true });
    fetch(`${this.BASE_URL}${filter}${searchTerm ? '/?search=' + searchTerm : ''}`)
      .then(res => res.json())
      .then(data => {
        if (data.next)
          this.getAll(data).then(results => {
            let flatResults = [];
            results.forEach(arr => arr.forEach(item => flatResults.push(item)));
            this.setState({ data: flatResults, searching: false });
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
    if (!data.next) return results;

    return fetch(`${data.next}`)
      .then(res => res.json())
      .then(newData => {
        results = [...results, newData.results];
        return this.getAll(newData, results);
      })
      .catch(err => console.log(err));
  }

  routeByType() {
    if (this.state.data.length > 0) {
      return this.state.data.map(dataObj => (
        <li className="outerList">
          <ul className="innerList">
            <Route
              path="/results/films"
              render={() => <Results title={dataObj.title} director={dataObj.director} />}
            />
            <Route
              path="/results/people"
              render={() => <Results name={dataObj.name} gender={dataObj.gender} />}
            />
            <Route
              path="/results/planets"
              render={() => <Results name={dataObj.name} climate={dataObj.climate} />}
            />
            <Route
              path="/results/species"
              render={() => <Results name={dataObj.name} classification={dataObj.classification} />}
            />
            <Route
              path="/results/starships"
              render={() => <Results name={dataObj.name} manufacturer={dataObj.manufacturer} />}
            />
            <Route
              path="/results/vehicles"
              render={() => <Results name={dataObj.name} manufacturer={dataObj.manufacturer} />}
            />
          </ul>
        </li>
      ));
    } else return <li className="noResults">No results found for this search</li>;
  }

  render() {
    return (
      <>
        <Route path="/">
          <header>
            <h1>Star Wars Search App</h1>
          </header>

          <Search search={this.search} />
        </Route>
        <main className="App">
          <ErrorPage>
            <ul className="searchResults">
              <Route path="/" render={() => (this.state.searching ? <Loading /> : <div></div>)} />
              <Route path="/results" render={() => this.routeByType()} />
            </ul>
          </ErrorPage>
        </main>
      </>
    );
  }
}