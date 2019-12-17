import React from 'react';
import ReactLoading from 'react-loading';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <ReactLoading type={'bars'} color={'#e5b13a'} />
      </div>
    );
  }
}