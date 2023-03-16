import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberPicker, HQNumberPicker } from '../src';

const meta: Meta<HQNumberPicker> = {
  title: 'NUMBER PICKER',
  component: NumberPicker,
  argTypes: {
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

const Template: Story<HQNumberPicker> = args => <NumberPicker {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const NumberPickerStory = Template.bind({});

NumberPickerStory.args = {};
