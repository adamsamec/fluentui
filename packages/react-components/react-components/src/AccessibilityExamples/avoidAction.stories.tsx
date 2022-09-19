import * as React from 'react';

import {
  Button,
  Text,
  Divider,
  CalendarMonth,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Input,
  Label,
  Radio,
  RadioGroup,
  Checkbox,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidActionExample = () => {
  const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

  return (
    <Scenario pageTitle="Avoid action in accessibility name">
      <h1>Avoid action in accessibility name</h1>

      <h2>Bad example</h2>
      <Button aria-label="press enter key to open calendar button" size="small" icon={<CalendarMonth />}>
        Calendar
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narraton:</Text> "press enter key to open calendar button"
      </Text>
      <Divider />
      <h2>Good example</h2>
      <Button size="small" icon={<CalendarMonth />}>
        Calendar
      </Button>
      <Text block>
        <Text weight="semibold">Screen reader narraton:</Text> "calendar button"
      </Text>
      <Divider />
      <h2>User impact</h2>
    </Scenario>
  );
};
