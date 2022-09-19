import * as React from 'react';

import { Button, Text, Divider } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidComponentTypeExample = () => {
  const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

  return (
    <Scenario pageTitle="Avoid component type in accessibility name">
      <h1>Avoid component type in accessibility name</h1>

      <h2>Bad example</h2>
      <Button aria-label="Mute microphone button" size="small" icon={<CalendarMonth />}>
        Calendar
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Click here to open calendar button"
      </Text>
      <Divider />
      <h2>Good example</h2>
      <Button size="small" icon={<CalendarMonth />}>
        Mute microphone
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "calendar button"
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
