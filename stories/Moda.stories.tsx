import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Modal, HQModal } from '../src';

const meta: Meta<HQModal> = {
  title: 'Modal',
  component: Modal,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQModal> = args => <Modal {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const ModalStory = Template.bind({});

ModalStory.args = {};
