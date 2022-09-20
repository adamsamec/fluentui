import * as React from 'react';

import { Button, Text, Divider } from '@fluentui/react-components';
import { Mic24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidComponentTypeExample = () => {
  return (
    <Scenario pageTitle="Avoid component type in accessibility name">
      <h1>Avoid component type in accessibility name</h1>
      <h2>Bad example</h2>
      <Button aria-label="Mute microphone button" size="small" icon={<Mic24Regular />}>
        Mute microphone
      </Button>
      <Text block>
        <Text weight="semibold">Added aria label:</Text> aria-label="Mute microphone button"
      </Text>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text>
        "Mute microphone button button"
      </Text>
      <Divider />
      <h2>Good example</h2>
      <Button size="small" icon={<Mic24Regular />}>
        Mute microphone
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Mute microphone button"
      </Text>
      <Divider />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding the component type (such as "button") to the component accessible name duplicates information that is
          already provided by the screen reader when the component is focused.
        </li>
      </ul>
    </Scenario>
  );
};
