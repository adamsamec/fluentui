import * as React from 'react';
import {
  Provider,
  teamsTheme,
  Menu,
  Toolbar,
  tabListBehavior,
  menuAsToolbarBehavior,
  MenuItemProps,
  ShorthandCollection,
} from '@fluentui/react-northstar';
import {
  BulletsIcon,
  NumberListIcon,
  ToDoListIcon,
  UnderlineIcon,
  FontColorIcon,
  FormatIcon,
  PaperclipIcon,
  EmojiIcon,
  GiphyIcon,
  StickerIcon,
  VideoCameraEmphasisIcon,
  SettingsIcon,
  MoreIcon,
  BookmarkIcon,
  TranslationIcon,
  TrashCanIcon,
  MarkAsUnreadIcon,
} from '@fluentui/react-icons-northstar';

const menuItems = [
  {
    key: 'item1',
    content: 'Item #1',
  },
  {
    key: 'item2',
    content: 'Disabled item',
    disabled: true,
  },
  {
    key: 'item3',
    content: 'Item #3',
  },
];

const tabItems = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews', disabled: true },
  { key: 'events', content: 'Upcoming Events' },
];

const menuToolbarItems: ShorthandCollection<MenuItemProps> = [
  {
    icon: (
      <FormatIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'format',
    'aria-label': 'Format Tool',
  },
  {
    icon: (
      <PaperclipIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'paperclip',
    'aria-label': 'Paperclip Tool',
  },
  {
    icon: (
      <EmojiIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'emoji',
    disabled: true,
    'aria-label': 'Emoji Tool',
  },
  {
    icon: (
      <GiphyIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'giphy',
    'aria-label': 'Giphy tool',
  },
  {
    icon: (
      <StickerIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'sticker',
    'aria-label': 'Sticker Tool',
  },
  {
    icon: (
      <VideoCameraEmphasisIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'meetup',
    'aria-label': 'Meetup Tool',
  },
  {
    icon: (
      <SettingsIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'settings',
    'aria-label': 'Settings',
  },
  {
    icon: (
      <MoreIcon
        {...{
          outline: true,
        }}
      />
    ),
    key: 'menuButton2',
    'aria-label': 'More options',
    indicator: false,
    menu: {
      items: [
        {
          key: '5',
          content: 'item1',
          icon: <BookmarkIcon outline />,
        },
        {
          key: 'divider',
          kind: 'divider',
        },
        {
          key: '6',
          content: 'item2',
          icon: <MarkAsUnreadIcon outline />,
        },
        {
          key: '7',
          content: 'item3',
          disabled: true,
          icon: <TranslationIcon outline />,
        },
        {
          key: 'divider2',
          kind: 'divider',
        },
        {
          key: '8',
          content: 'item3',
          icon: <TrashCanIcon outline />,
        },
      ],
    },
  },
];

const DisabledFocusable: React.FunctionComponent = () => {
  const [bulletListActive, setBulletListActive] = React.useState(false);
  const [numberListActive, setNumberListActive] = React.useState(false);
  const [toDoListActive, setToDoListActive] = React.useState(false);

  const [toolbarActiveIndex, setToolbarActiveIndex] = React.useState(0);
  const [toolbarMenuOpen, setToolbarMenuOpen] = React.useState(false);

  return (
    <Provider theme={teamsTheme}>
      <h1>Disabled Menuitem Prototype</h1>

      <Toolbar
        aria-label="Toolbar can contain a radio group in a menu"
        items={[
          {
            key: 'radiogroup',
            kind: 'group',
            items: [
              {
                key: 'bullets',
                icon: <BulletsIcon {...{ outline: true }} />,
                active: bulletListActive,
                onClick: () => {
                  setBulletListActive(!bulletListActive);

                  // deselect other radio items
                  setNumberListActive(false);
                  setToDoListActive(false);
                },
                'aria-label': 'bullet list',
              },
              {
                key: 'number-list',
                icon: <NumberListIcon {...{ outline: true }} />,
                disabled: true,
                active: numberListActive,
                onClick: () => {
                  setNumberListActive(!numberListActive);

                  // deselect other radio items
                  setBulletListActive(false);
                  setToDoListActive(false);
                },
                'aria-label': 'number list',
              },
              {
                key: 'to-do-list',
                icon: <ToDoListIcon {...{ outline: true }} />,
                active: toDoListActive,
                onClick: () => {
                  setToDoListActive(!toDoListActive);

                  // deselect other radio items
                  setBulletListActive(false);
                  setNumberListActive(false);
                },
                'aria-label': 'to do list',
              },
            ],
          },
          {
            key: 'underline',
            content: 'underline',
            icon: <UnderlineIcon />,
            title: 'Underline',
            disabled: true,
          },
          {
            key: 'check-me',
            content: 'check me',
            icon: <UnderlineIcon />,
            title: 'Check me',
            kind: 'toggle',
            disabled: true,
          },
          {
            key: 'font color',
            content: 'font color',
            icon: <FontColorIcon />,
            title: 'Font color',
          },
          {
            icon: <MoreIcon />,
            key: 'more',
            active: toolbarMenuOpen,
            title: 'More',
            menu: [
              {
                key: 'group',
                activeIndex: toolbarActiveIndex,
                kind: 'group',
                items: [
                  { key: 'left', content: 'Left' },
                  { key: 'center', content: 'Center', disabled: true },
                  { key: 'right', content: 'Right' },
                  { key: 'justify', content: 'Justify' },
                ],
                onItemClick: (e, data) => setToolbarActiveIndex(data.index),
              },
              { key: 'divider', kind: 'divider' },
              {
                key: 'something',
                content: 'Something',
                disabled: true,
              },
              {
                key: 'some-check',
                content: 'Some check',
                kind: 'toggle',
                active: true,
                disabled: true,
              },
              'About...',
            ],
            menuOpen: toolbarMenuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              setToolbarMenuOpen(menuOpen);
            },
          },
        ]}
      />

      <Menu defaultActiveIndex={0} items={menuItems} />

      <Menu
        defaultActiveIndex={0}
        items={tabItems}
        underlined
        primary
        accessibility={tabListBehavior}
        aria-label="Today's events"
      />

      <Menu
        defaultActiveIndex={0}
        items={menuToolbarItems}
        iconOnly
        accessibility={menuAsToolbarBehavior}
        aria-label="Compose Editor"
      />
    </Provider>
  );
}; // End DisabledFocusable

export default DisabledFocusable;
