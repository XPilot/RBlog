import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router'
import cx from 'classnames';

import './post.scss';

class Post extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lead: PropTypes.node,
  }

  render() {
    const {
      className,
      children,
      id,
      lead,
      title,
    } = this.props;

    const postClasses = {
      'Post': true,
    };

    return (
      <div className={cx(postClasses, className)}>
        <Link to={`post/${id}`}>
          <h4 className="Post-Title">{title}</h4>
        </Link>
        <p className="Post-Lead">{lead}</p>
        <div className="Post-Body" dangerouslySetInnerHTML={{ __html: children }} />
      </div>
    );
  }
}

export default Post;
