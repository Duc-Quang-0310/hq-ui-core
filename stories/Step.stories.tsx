import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Steps, HQStepsProps } from '../src';

const meta: Meta<HQStepsProps> = {
  title: 'STEPS',
  component: Steps,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQStepsProps> = args => <Steps {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const StepsStory = Template.bind({});

StepsStory.args = {};
