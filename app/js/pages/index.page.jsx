import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostsActions from '../actions/posts.actions';

import Post from 'js/components/post/post';

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
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.getAPIPosts();
  }

  renderPosts() {
    const { posts } = this.props;
    return posts.map((post, key) => {
      const { id, title, lead, body } = post;

      return (
        <Post
          key={key}
          id={id}
          title={title}
          lead={lead}
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
