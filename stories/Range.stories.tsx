import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Range, HQRangeProps } from '../src';

const meta: Meta<HQRangeProps> = {
  title: 'RANGE',
  component: Range,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQRangeProps> = args => <Range {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const RangeStory = Template.bind({});

RangeStory.args = {};
