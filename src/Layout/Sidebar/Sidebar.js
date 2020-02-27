import React from 'react';
/** Components */
// import Tabs from '@common/Tabs';
import Queue from './Queue';

/** Styled components */
import { SidebarWrapper } from './sidebar.styled';

const Sidebar = () => (
  <SidebarWrapper>
    <Queue />
    {/* <Tabs>
      <Queue label="Queue" icon="align-justify" />
      <div label="Chat" icon="comment-dots">
        After while, <em>Crocodile</em>!
      </div>
    </Tabs> */}
  </SidebarWrapper>
);

Sidebar.propTypes = {};

export default Sidebar;
