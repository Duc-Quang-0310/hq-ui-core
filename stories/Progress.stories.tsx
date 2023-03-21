import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Progress, HQProgress } from '../src';

const meta: Meta<HQProgress> = {
  title: 'PROGRESS',
  component: Progress,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQProgress> = args => <Progress {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const ProgressStory = Template.bind({});

ProgressStory.args = {};
