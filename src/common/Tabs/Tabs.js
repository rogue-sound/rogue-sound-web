import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
/** Styled components */
import { TabList } from './tabs.styled';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  useEffect(() => {}, []);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };
  return (
    <div className="tabs">
      <TabList>
        {children.map(child => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClickTabItem={onClickTabItem}
            />
          );
        })}
      </TabList>
      <div className="tab-content">
        {children.map(child => {
          return child.props.label === activeTab ? child.props.children : null;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tabs;
