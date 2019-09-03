import React from 'react';
import {AutoSizer, List} from 'react-virtualized';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-virtualized/styles.css';
import {Actions} from 'store';
import classNames from 'classnames';

import Loader from 'components/Loader/Loader';
import './Form.css';
const cityList = window.cityList;

let timeOut;
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      listData: [],
    };
  }

  componentDidMount() {
    this.setState({listData: cityList, filterWorker: new Worker('/webWorker.js')}, () => {
      this.state.filterWorker.onmessage = this.workerResponse;
    })
  }

  onClickCity = (city) => {
    if (!this.props.loading) {
      this.props.loadCity(city.id);
    }
  }

  handleChange = (e) => {
    e.persist();
    let {filtering} = this.props;
    if (!filtering) {
      this.setState({[e.target.name]: e.target.value});
      if (timeOut) {
        clearTimeout(timeOut);
      }
      timeOut = setTimeout(() => {
        this.props.setFilteringData(true);
        this.state.filterWorker.postMessage({list: cityList, filter: e.target.value});
        clearTimeout(timeOut);
      }, 500);
    }
  }

  workerResponse = (e) => {
    this.setState({listData: e.data.result});
    this.props.setFilteringData(false);
  }

  renderRow = ({key, index, style}) => {
    let city = this.state.listData[index];
    return (
      <div className="wm-list-item" title={`${city.name} - ${city.country}`} onClick={() => this.onClickCity(city)} key={key} style={style}>
        {`${city.name} - ${city.country}`}
      </div>
    )
  }

  render() {
    let {listData} = this.state;
    let {filtering} = this.props;
    return (
      <div className="wm-form">
        <div className="wm-form-search">
            <input
              type="text"
              name="name"
              placeholder="Enter a city"
              value={this.state.name}
              onChange={this.handleChange}
            />
        </div>
        <div className={classNames("wm-form-list", {'loading': filtering})}>
          <AutoSizer>
            {({height, width}) => (
              <List
                width={width}
                height={height}
                rowCount={listData.length}
                rowHeight={30}
                rowRenderer={this.renderRow}
              />
            )}
          </AutoSizer>
          <Loader isloading={filtering} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadCity: Actions.loadCity,
    setDisplayName: Actions.setDisplayName,
    setData: Actions.setData,
    setLoadingData: Actions.setLoadingData,
    setFilteringData: Actions.setFilteringData
  }, dispatch);
}

function mapStateToProps({form}) {
  return {
    loading: form.loading,
    filtering: form.filtering
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
