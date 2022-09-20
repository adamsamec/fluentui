import * as React from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  Divider,
} from '@fluentui/react-components';

import { Scenario } from './utils';

export const AvoidPositionExample = () => {
  return (
    <Scenario pageTitle="Avoid position in accessibility name">
      <h1>Avoid position in accessibility name</h1>

      <h2>Bad example</h2>
      <Menu>
        <MenuTrigger>
          <MenuButton>Profile</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem role="listitem">Account settings...</MenuItem>
            <MenuItem role="listitem">Change status message...</MenuItem>
            <MenuItem role="listitem">Help</MenuItem>
            <MenuItem role="listitem">Sign out</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Text block>
        <Text weight="semibold">Screen reader narration:</Text> "Click here to send message button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Click here to send message" was applied on the component.</li>
      </ul>
      <Divider />
      <h2>Good example</h2>
      <Menu>
        <MenuTrigger>
          <MenuButton>Profile</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Account settings...</MenuItem>
            <MenuItem>Change status message...</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
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
        <li>
          Verify the component uses the proper HTML element or the proper ARIA role, so that the component type can be
          recognized by the screen reader.
        </li>
      </ul>
    </Scenario>
  );
};
