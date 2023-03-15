import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Title, HQTitleProps } from '../src';

const meta: Meta<HQTitleProps> = {
  title: 'TITLE',
  component: Title,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQTitleProps> = args => <Title {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const TitleStory = Template.bind({});

TitleStory.args = {};
