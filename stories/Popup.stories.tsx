import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Popup, HQPopup } from '../src';

const meta: Meta<HQPopup> = {
  title: 'POP UP',
  component: Popup,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQPopup> = args => <Popup {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const PopupStory = Template.bind({});

PopupStory.args = {};
