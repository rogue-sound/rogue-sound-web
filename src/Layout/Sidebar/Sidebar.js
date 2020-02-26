import React from 'react';
/** Components */
import Tabs from '@common/Tabs';
import Queue from './Queue';

/** Styled components */
import { SidebarWrapper } from './sidebar.styled';

const Sidebar = () => (
  <SidebarWrapper>
    <Queue />
    <Tabs>
      <div label="Croc">
        After while, <em>Crocodile</em>!
      </div>
      <Queue label="Queue" />
      {/* <div label="Gator">
        See ya later, <em>Alligator</em>!
      </div>
      <div label="Croc">
        After 'while, <em>Crocodile</em>!
      </div>
      <div label="Sarcosuchus">
        Nothing to see here, this tab is <em>extinct</em>!
      </div> */}
    </Tabs>
  </SidebarWrapper>
);

Sidebar.propTypes = {};

export default Sidebar;
