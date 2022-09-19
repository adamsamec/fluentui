import * as React from 'react';

import { Button, Text, Divider } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidActionExample = () => {
  const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

  return (
    <Scenario pageTitle="Avoid action in accessibility name">
      <h1>Avoid action in accessibility name</h1>

      <h2>Bad example</h2>
      <Button aria-label="Click here to open calendar " size="small" icon={<CalendarMonth />}>
        Calendar
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Click here to open calendar button"
      </Text>
      <Divider />
      <h2>Good example</h2>
      <Button size="small" icon={<CalendarMonth />}>
        Calendar
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "calendar button"
      </Text>
      <Divider />
      <h2>Problem explanation</h2>
      <Text block>
        Instruction on action prolong screen reader narration. It not neccessary information for sceen reader user. This
        information is already know based on type of component which is used.
      </Text>
    </Scenario>
  );
};
