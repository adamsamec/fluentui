import * as React from 'react';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Label,
  Radio,
  RadioGroup,
  Checkbox,
} from '@fluentui/react-components';

import { Scenario } from './utils';

export const AvoidActionExample = () => {
  return (
    <Scenario pageTitle="Personal form accordion">
      <h1>Bad example</h1>

      <h1>Good example</h1>
    </Scenario>
  );
};
