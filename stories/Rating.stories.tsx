import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Rating, HQRatingProps } from '../src';

const meta: Meta<HQRatingProps> = {
  title: 'RATING',
  component: Rating,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQRatingProps> = args => <Rating {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const RatingStory = Template.bind({});

RatingStory.args = {};
