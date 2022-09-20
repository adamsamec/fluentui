import * as React from 'react';

import { Button, Text, Divider } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, Send24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidActionExample = () => {
  return (
    <Scenario pageTitle="Avoid action in accessibility name">
      <h1>Avoid action in accessibility name</h1>

      <h2>Bad example</h2>
      <Button aria-label="Click here to send message " size="small" icon={<Send24Regular />}></Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Click here to send message button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>Incorrect aria-label="Click here to send message " was applied on the component.</li>
      </ul>
      <Divider />
      <h2>Good example</h2>
      <Button aria-label="Send message" size="small" icon={<Send24Regular />}></Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Send message button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Send message " was applied on the component.</li>
      </ul>
      <Divider />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding the action instruction (such as "Click here to...") to the component accessible name prolongs the name
          narration by the screen reader when the component is focused. This information is already known to the screen
          reader user based on the type of component beeing used, i.e. a button in this case.
        </li>
      </ul>
    </Scenario>
  );
};
