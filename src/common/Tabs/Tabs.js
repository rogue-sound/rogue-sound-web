import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNestedObject } from '@utils/utils';
import Tab from './Tab';
/** Styled components */
import { TabsWrapper, TabList, TabContent } from './tabs.styled';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (Array.isArray(children) && children.length) {
      setActiveTab(getNestedObject(children[0], ['props', 'label']));
    }
  }, [children]);

  const onClickTabItem = tab => {
    setActiveTab(tab);
  };

  return (
    <TabsWrapper>
      <TabList>
        {children.map(child => {
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
        {children.map(
          child =>
            getNestedObject(child, ['props', 'label']) === activeTab && child
        )}
      </TabContent>
    </TabsWrapper>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tabs;
