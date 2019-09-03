import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Form from 'components/Form/Form';
import Graph from 'components/Graph/Graph';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';

import './App.css'

class App extends React.Component {

  render() {
    let {loading} = this.props;
    return (
      <div className="wm-wrapper">
        <div className="wm-sidebar">
          <Form />
        </div>
        <div className={classNames("wm-content", {'loading': loading})}>
          <Header />
          <Graph />
          <Loader isloading={loading} />
        </div>
      </div>
    );
  }
}


function mapStateToProps({form}) {
  return ({
    loading: form.loading
  });
}

export default connect(mapStateToProps)(App);
