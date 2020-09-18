import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from '../_Common/pageNotFound';
import { TPage } from '../Home/pages';

type TRouter = {
  userRole: string,
  pages: TPage[]
};

const Router: FC<TRouter> = ({ userRole, pages }) => (
  <Switch>
    {pages
      .filter((e) => e.role === userRole)
      .map((e) => (
        <Route key={e.url} exact={e.exact} path={e.url}>
          <e.component routes={pages} />
        </Route>
      ))}
    {/* <Route exact path="/404" component={PageNotFound} />
    <Route>
      <Redirect to="/404" />
    </Route> */}
  </Switch>
);

export default Router;
