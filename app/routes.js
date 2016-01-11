import React from 'react';
import { IndexRoute, Route } from 'react-router';

// layout
import Layout from 'js/pages/layout.page';

// pages
import IndexPage from 'js/pages/index.page';
import PostPage from 'js/pages/post.page';

export default function routes() {
  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage} />
      <Route path="/post" component={PostPage} />
    </Route>
  );
}
