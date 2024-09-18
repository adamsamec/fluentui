import * as React from 'react';

const APP_TITLE = 'Component Selector';
const APP_TITLE_SEPARATOR = ' | ';
const formatComponentStoryUrl = (component, story) =>
  `https://react.fluentui.dev/?path=/docs/components-${component}--docs#${story}`;

interface FullscreenLinkProps {
  parent: string;
  story: string;
  content: string;
}

// https://storybook.js.org/addons/@storybook/addon-links does not allow opening a story in new tab
// so this is a naive attempt for opening a story in full screen
export const FullscreenLink = (props: FullscreenLinkProps) => (
  <a className="sbdocs sbdocs-a" href={`iframe.html?id=${props.parent}--${props.story}`} target="_blank">
    {props.content}
  </a>
);

export const ScenariosListLink: React.FC = props => (
  <a
    className="sbdocs sbdocs-a"
    href={`iframe.html?id=concepts-developer-accessibility-stories-list-of-scenarios--page`}
  >
    {props.children}
  </a>
);

export const BackLink = () => <ScenariosListLink>Go back to main menu</ScenariosListLink>;

export const Scenario: React.FC<{ pageTitle: string }> = ({ pageTitle, children }) => {
  React.useEffect(() => {
    document.title = pageTitle + APP_TITLE_SEPARATOR + APP_TITLE;
  }, [pageTitle]);

  return (
    <div role="main">
      <BackLink />
      <br />
      {children}
    </div>
  );
};

export const removeFromArray = (array: string[], item: string) => {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
};

const camelToDashed = camel => {
  console.log('Milan: camel', camel);
  const dashed = camel.toLowerCase().replace(/\ |\:/g, '-');
  return dashed;
};

export const getComponentStoryUrl = component => {
  const dashedComponent = component.name && camelToDashed(component.component);
  const dashedStory = component.story ? camelToDashed(component.story) : 'default';
  const url = formatComponentStoryUrl(dashedComponent, dashedStory);
  return url;
};
