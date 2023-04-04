import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Input, HQInput } from '../src';

const meta: Meta<HQInput> = {
  title: 'INPUT',
  component: Input,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQInput> = args => <Input {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const InputStory = Template.bind({});

InputStory.args = {};
