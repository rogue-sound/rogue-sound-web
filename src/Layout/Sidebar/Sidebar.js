import React from 'react';
import { useIntl } from 'react-intl';
/** Components */
import Tabs from '@common/Tabs';
import Queue from './Queue';

/** Styled components */
import { SidebarWrapper } from './sidebar.styled';

const Sidebar = () => {
  const intl = useIntl();
  return (
    <SidebarWrapper>
      <Tabs>
        <Queue
          label={intl.formatMessage({
            id: 'app.layout.Sidebar.Queue.QueueText',
          })}
          icon="align-justify"
        />
        {/* <div label="Chat" icon="comment-dots">
        After while, <em>Crocodile</em>!
      </div> */}
      </Tabs>
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
