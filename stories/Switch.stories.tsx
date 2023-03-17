import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Switch, HQSwitch } from '../src';

const meta: Meta<HQSwitch> = {
  title: 'SWITCH',
  component: Switch,
  argTypes: {
    width: {
      control: {
        type: 'text',
      },
    },
    height: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQSwitch> = args => <Switch {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const SwitchStory = Template.bind({});

SwitchStory.args = {};
