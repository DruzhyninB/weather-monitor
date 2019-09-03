import React from 'react';
import {connect} from 'react-redux';
import './Header.css';

class Header extends React.Component {
  
  render() {
    let {name} = this.props;
    return (
      <div className="wm-header">
        <p>
          {name}
        </p>
      </div>
    );
  }
}

function mapStateToProps({form}) {
  return ({
    name: form.name,
  });
}

export default connect(mapStateToProps)(Header);
