import * as React from 'react';

import { Text, Divider, TabList, Tab } from '@fluentui/react-components';

import { Scenario } from './utils';

export const AvoidStateExample = () => {
  return (
    <Scenario pageTitle="Avoid state in accessibility name">
      <h1>Avoid state in accessibility name</h1>
      <h2>Bad example</h2>
      <TabList defaultSelectedValue="Files">
        <Tab value="Chat">Chat</Tab>
        <Tab value="Files" aria-label="Files tab is active">
          Files
        </Tab>
        <Tab value="Activity">Activity</Tab>
      </TabList>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> " Files tab is active tab selected 2 of 3"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Files tab is active" was applied on the "Files" tab</li>
      </ul>
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
      <h3>Implementation details</h3>
      <ul>
        <li>no aria-label is needed for "Files" tab</li>
      </ul>
      <Divider />
      <h2>Problem explanation</h2>
      <ul>
        <li>Adding custom state is not required, because this functionality should provide us the screen reader.</li>
        <li>
          If state of coponent is not narrated, then verify there is used "aria-checked" or "aria-selected" attribute.
          See aria documentation for exact usage.
        </li>
      </ul>
    </Scenario>
  );
};
