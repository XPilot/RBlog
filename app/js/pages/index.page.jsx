import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { ActionCreators } from 'redux-undo';

import PostsActions from '../actions/posts.actions';

import Post from 'js/components/post/post';
import PostEditable from 'js/components/post-editable/post-editable';

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PostsActions, dispatch),
  };
}

class IndexPage extends Component {
  static propTypes ={
    actions: PropTypes.object,
    posts: PropTypes.arrayOf(PropTypes.object),
  };

  componentWillMount() {
    const { actions } = this.props;
    actions.getAPIPosts();
  }

  onPostAdd() {
    const { actions } = this.props;
    actions.addPostAction();
  }

  onEditPost(postId) {
    const { actions } = this.props;
    actions.editPostAction(postId);
  }

  onDeletePost(postId) {
    const { actions } = this.props;
    actions.deletePostAction(postId);
  }

  onSavePost(id, mode, post) {
    const { actions } = this.props;
    const postData = post;
    postData.id = id;

    switch (mode) {
      case 'add':
        actions.createPostAction(postData);
        break;
      case 'edit':
        actions.updatePostAction(postData);
        break;
      default:
        break;
    }
  }

  onCancelPost(id, mode) {
    const { actions } = this.props;

    switch (mode) {
      case 'add':
        actions.addPostAction({});
        break;
      case 'edit':
        actions.editPostAction(id);
        break;
      default:
        break;
    }
  }

  renderPosts() {
    const { posts } = this.props;

    if (!posts.length) {
      return (<p className="Layout-Message">No post found. Why not add some? :)</p>);
    }

    return posts.map((post, key) => {
      const { id, title, lead, body, mode } = post;

      if (mode && (mode === 'edit' || mode === 'add')) {
        return (
          <PostEditable
            key={key}
            title={title}
            lead={lead}
            onPostSave={this.onSavePost.bind(this, id, mode)}
            onPostCancel={this.onCancelPost.bind(this, id, mode)}
          >
          {body}
        </PostEditable>
        );
      }

      return (
        <Post
          key={key}
          id={id}
          title={title}
          lead={lead}
          onPostEdit={this.onEditPost.bind(this, id)}
          onPostDelete={this.onDeletePost.bind(this, id)}
        >
          {body}
        </Post>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
        <div className="Blog-Controls">
          <button className="Button" onClick={this.onPostAdd.bind(this)}>Add new post</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
