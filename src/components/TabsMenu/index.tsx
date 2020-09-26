import React, { FC } from 'react';
import { Tabs } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { TPage } from '../Home/pages';

import './style.scss';

type TRouter = {
  userRole: string,
  pages: TPage[]
};

interface ILocationState {
  pathname: string;
}

const { TabPane } = Tabs;

const TabsMenu: FC<TRouter> = ({ userRole, pages }) => {
  const location: ILocationState = useLocation(); 

  return (
    <nav className='tabs'>
      <Tabs activeKey={location.pathname}>
        {pages
          .filter((e) => e.role === userRole && e.isTab)
          .map((e) => (
            <TabPane tab={<Link to={e.url} key={`link_${e.url}`}>{e.title}</Link>} key={e.url} />
          ))
        }
      </Tabs>
    </nav>
  );
};

export default TabsMenu;
