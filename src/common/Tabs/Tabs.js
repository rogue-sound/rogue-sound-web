import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNestedObject } from '@utils/utils';
import Tab from './Tab';
/** Styled components */
import { TabsWrapper, TabList, TabContent } from './tabs.styled';

const Tabs = ({ children }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (Array.isArray(children) && children.length) {
      setActiveTab(getNestedObject(children[0], ['props', 'label']));
      setTabs(children);
    } else if (typeof children === 'object') {
      setActiveTab(getNestedObject(children, ['props', 'label']));
      setTabs([children]);
    }
  }, [children, setTabs, setActiveTab, getNestedObject]);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <TabsWrapper>
      <TabList>
        {tabs.map(child => {
          const { label, icon } = child.props;
          return (
            <Tab
              isActiveTab={activeTab === label}
              key={label}
              label={label}
              icon={icon}
              onClickTabItem={onClickTabItem}
            />
          );
        })}
      </TabList>
      <TabContent>
        {tabs.map(
          child =>
            getNestedObject(child, ['props', 'label']) === activeTab && child
        )}
      </TabContent>
    </TabsWrapper>
  );
};

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Tabs;
