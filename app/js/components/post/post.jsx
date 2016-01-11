import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './post.scss';

class Post extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    lead: PropTypes.node,
  }

  render() {
    const {
      className,
      children,
      lead,
      title,
    } = this.props;

    const postClasses = {
      'Post': true,
    }

    return (
      <div className={cx(postClasses, className)}>
        <h4 className="Post-Title">{title}</h4>
        <p className="Post-Lead">{lead}</p>
        <div className="Post-Body">
        </div>
      </div>
    );
  }
}

export default Post;
