import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Divider, HQDivider } from '../src';

const meta: Meta<HQDivider> = {
  title: 'DIVIDER',
  component: Divider,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQDivider> = args => <Divider {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const DividerStory = Template.bind({});

DividerStory.args = {};
