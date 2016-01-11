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
    actions: bindActionCreators(PostsActions, dispatch)
  };
}

class IndexPage extends Component {
  static propTypes ={
    actions: PropTypes.object,
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.get();
  }

  renderPosts() {

  }

  render() {
    console.log('our props', this.props.posts);
    return (
      <div>
        <Post>
          This should e the post body
        </Post>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
