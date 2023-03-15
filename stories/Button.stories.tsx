import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, HQButtonProps } from '../src';

const meta: Meta<HQButtonProps> = {
  title: 'BUTTON',
  component: Button,
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

const Template: Story<HQButtonProps> = args => <Button {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const ButtonStory = Template.bind({});

ButtonStory.args = {};
