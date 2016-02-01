import React, { Component, PropTypes } from 'react';

import 'scss/main.scss';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="Blog">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
