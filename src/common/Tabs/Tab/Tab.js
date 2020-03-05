import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/** Styled components */
import { TabItemNormal, TabItemActive, TabLabel } from '../tabs.styled';

const Tab = ({ isActiveTab, label, icon, onClickTabItem }) => {
  const TabItem = isActiveTab ? TabItemActive : TabItemNormal;

  return (
    <TabItem type="button" tabIndex="0" onClick={() => onClickTabItem(label)}>
      <FontAwesomeIcon icon={icon} />
      {isActiveTab && <TabLabel>{label}</TabLabel>}
    </TabItem>
  );
};

Tab.propTypes = {
  isActiveTab: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClickTabItem: PropTypes.func.isRequired,
};

export default Tab;
