import * as React from 'react';

import {
  Text,
  Divider,
  Avatar,
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from '@fluentui/react-components';

import { PeopleRegular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const NoRepeatText = () => {
  return (
    <Scenario pageTitle="Avoid repeating text for item within one component ">
      <h1>Avoid repeating text for item within one component</h1>
      <h2>Bad example</h2>
      <Menu>
        <MenuTrigger>
          <Button aria-label="Users" icon={<PeopleRegular />}></Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem aria-label="Meeting participant Robert Tolbert" icon={<Avatar />}>
              Robert Tolbert
            </MenuItem>
            <MenuItem aria-label="Meeting participant Celeste Burton" icon={<Avatar />}>
              Celeste Burton
            </MenuItem>
            <MenuItem aria-label="Meeting participant Cecil Folk" icon={<Avatar />}>
              Cecil Folk
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Files tab is active" was applied on the "Files" tab</li>
      </ul>
      <Divider />
      <h2>Good example</h2>
      <Menu>
        <MenuTrigger>
          <Button aria-label="Users" icon={<PeopleRegular />}></Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList aria-label="Meeting participants" aria-labelledby={undefined}>
            <MenuItem aria-label="Robert Tolbert" icon={<Avatar />}>
              Robert Tolbert
            </MenuItem>
            <MenuItem aria-label="Celeste Burton" icon={<Avatar />}>
              Celeste Burton
            </MenuItem>
            <MenuItem aria-label="Cecil Folk" icon={<Avatar />}>
              Cecil Folk
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

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
