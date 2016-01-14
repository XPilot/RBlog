import React, { Component, PropTypes } from 'react';
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

  onPostSaveClick() {
    const { onPostSave } = this.props;

    const post = {
      title: this.refs.title.value,
      lead: this.refs.lead.value,
      body: this.refs.body.value,
    };

    onPostSave(post);
  }

  render() {
    const {
      className,
      children,
      lead,
      title,
      onPostCancel,
    } = this.props;

    const postEditableClasses = {
      'PostEditable': true,
    };

    return (
      <div className={cx(postEditableClasses, className)}>
        <label>
          Title:
          <input
            ref="title"
            className="PostEditable-Title PostEditable-Field"
            defaultValue={title}
            type="text"
          />
        </label>

        <label>
          Lead:
        <input
          ref="lead"
          className="PostEditable-Lead PostEditable-Field"
          defaultValue={lead}
          type="text"
        />
        </label>

        <label>
          Article:
        <textarea
          ref="body"
          className="PostEditable-Body PostEditable-Field PostEditable-Field--textarea"
          defaultValue={children}
        />
        </label>

        <div className="PostEditable-Controls">
          <button className="PostEditable-Control PostEditable-Control--save Button" onClick={this.onPostSaveClick.bind(this)}>Save changes</button>
          <button className="PostEditable-Control PostEditable-Control--cancel Button" onClick={onPostCancel}>Cancel changes</button>
        </div>
      </div>
    );
  }
}

export default PostEditable;
