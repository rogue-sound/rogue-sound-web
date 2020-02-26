import React from 'react';
import PropTypes from 'prop-types';
/** Styled components */
import { TabItem, TabItemActive } from '../tabs.styled';

const Tab = ({ activeTab, label, onClickTabItem }) => {
  const TabListItem = activeTab === label ? TabItemActive : TabItem;

  return (
    <TabListItem
      type="button"
      tabIndex="0"
      onClick={() => onClickTabItem(label)}
    >
      {label}
    </TabListItem>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClickTabItem: PropTypes.func.isRequired,
};

export default Tab;
