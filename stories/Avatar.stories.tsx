import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Avatar, HQAvatar } from '../src';

const meta: Meta<HQAvatar> = {
  title: 'AVATAR',
  component: Avatar,
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
    placeholderSrc: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQAvatar> = args => <Avatar {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const AvatarStory = Template.bind({});

AvatarStory.args = {};
