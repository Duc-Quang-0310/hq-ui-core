import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DoubleRange, HQDoubleRangeProps } from '../src';

const meta: Meta<HQDoubleRangeProps> = {
  title: 'DOUBLE RANGE',
  component: DoubleRange,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQDoubleRangeProps> = args => <DoubleRange {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const DoubleRangeStory = Template.bind({});

DoubleRangeStory.args = {};
