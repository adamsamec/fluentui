import * as React from 'react';

import { Button, Text, Divider, TabList, Tab } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidStateExample = () => {
  return (
    <Scenario pageTitle="Avoid state in accessibility name">
      <h1>Avoid state in accessibility name</h1>
      <h2>Bad example</h2>
      <TabList defaultSelectedValue="Files">
        <Tab value="Chat">Chat</Tab>
        <Tab value="Files" aria-label="Files tab selected">
          Files
        </Tab>
        <Tab value="Activity">Activity</Tab>
      </TabList>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> " Files tab selected tab selected 2 of 3"
      </Text>
      <Divider />
      <h2>Good example</h2>
      <TabList defaultSelectedValue="Files">
        <Tab value="Chat">Chat</Tab>
        <Tab value="Files">Files</Tab>
        <Tab value="Activity">Activity</Tab>
      </TabList>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Files tab selected 2 of 3"
      </Text>
      <Divider />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding an action instruction (such as "Click here to...") prolongs the narration by screen reader. It adds
          unnecessary information for screen reader user which is already known to the user based on the type of
          component beeing used, i.e. a button in this case.
        </li>
      </ul>
    </Scenario>
  );
};
