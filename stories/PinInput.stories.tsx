import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PinInput, HQPinInputProps } from '../src';

const meta: Meta<HQPinInputProps> = {
  title: 'PIN INPUT',
  component: PinInput,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQPinInputProps> = args => <PinInput {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const PinInputStory = Template.bind({});

PinInputStory.args = {};
