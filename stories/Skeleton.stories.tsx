import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Skeleton, HQSkeletonProps } from '../src';

const meta: Meta<HQSkeletonProps> = {
  title: 'SKELETON',
  component: Skeleton,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQSkeletonProps> = args => <Skeleton {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const SkeletonStory = Template.bind({});

SkeletonStory.args = {};
