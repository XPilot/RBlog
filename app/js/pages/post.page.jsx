import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostsActions from '../actions/posts.actions';

// helper functions
function mapStateToProps(state) {
  return {
    post: state.post
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PostsActions, dispatch),
  };
}

class PostPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    post: PropTypes.object,
  }

  componentWillMount() {
    const { actions, params } = this.props;
    actions.fetchSinglePost(params.postId);
  }

  renderPost(post) {
    const { body, lead, title } = post || {};

    if (!post) {
      return (<p className="PostPage-NotFound">Post not found!</p>);
    }

    return (
      <div className="PostPage">
        <h1 className="PostPage-Title">{title}</h1>
        <h2 className="PostPage-Lead">{lead}</h2>
        <div className="PostPage-Body" dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    );
  }

  render() {
    const { post } = this.props;
    return this.renderPost(post);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
