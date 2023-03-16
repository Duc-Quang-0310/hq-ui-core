import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Images, HQImage } from '../src';

const meta: Meta<HQImage> = {
  title: 'IMAGES',
  component: Images,
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
    useLoadingSkeleton: {
      control: {
        type: 'boolean',
      },
    },
    useLoadingFallback: {
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

const Template: Story<HQImage> = args => <Images {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const ImagesStory = Template.bind({});

ImagesStory.args = {};
