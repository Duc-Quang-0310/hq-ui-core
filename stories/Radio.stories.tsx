import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Radio, HQRadio } from '../src';

const meta: Meta<HQRadio> = {
  title: 'Radio',
  component: Radio,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
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
    labelSize: {
      control: {
        type: 'text',
      },
    },
    colorSchema: {
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

const Template: Story<HQRadio> = args => <Radio {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const RadioStory = Template.bind({});

RadioStory.args = {};
