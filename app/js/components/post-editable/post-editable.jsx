import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import './post-editable.scss';

class PostEditable extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    lead: PropTypes.node,
    onPostSave: PropTypes.func.isRequired,
    onPostCancel: PropTypes.func.isRequired,
  }

  render() {
    const {
      className,
      children,
      lead,
      title,
      onPostSave,
      onPostCancel,
    } = this.props;

    const postEditableClasses = {
      'PostEditable': true,
    };

    return (
      <div className={cx(postEditableClasses, className)}>
        <label>
          Title:
          <input type="text" className="PostEditable-Title PostEditable-Field" defaultValue={title} />
        </label>

        <label>
          Lead:
        <input type="text" className="PostEditable-Lead PostEditable-Field" defaultValue={lead} />
        </label>

        <label>
          Article:
        <textarea className="PostEditable-Body PostEditable-Field PostEditable-Field--textarea" defaultValue={children} />
        </label>

        <hr />

        <div className="PostEditable-Controls">
          <button className="PostEditable-Control PostEditable-Control--save Button" onClick={onPostSave}>Save changes</button>
          <button className="PostEditable-Control PostEditable-Control--cancel Button" onClick={onPostCancel}>Cancel changes</button>
        </div>
      </div>
    );
  }
}

export default PostEditable;
