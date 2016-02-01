import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import './post.scss';

class Post extends Component {
  // define our props that the component will use
  // the purpose of this object is to specify each type of props
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lead: PropTypes.node,
    onPostEdit: PropTypes.func.isRequired,
    onPostDelete: PropTypes.func.isRequired,
  };

  render() {
    const {
      className,
      children,
      id,
      lead,
      title,
      onPostEdit,
      onPostDelete,
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

        <hr />

        <div className="Post-Controls">
          <button className="Post-Control Post-Control--edit Button" onClick={onPostEdit}>Edit post</button>
          <button className="Post-Control Post-Control--delete Button" onClick={onPostDelete}>Delete post</button>
        </div>
      </div>
    );
  }
}

export default Post;
