import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tooltip, HQTooltipProps } from '../src';

const meta: Meta<HQTooltipProps> = {
  title: 'TOOL TIP',
  component: Tooltip,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<HQTooltipProps> = args => <Tooltip {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const TooltipStory = Template.bind({});

TooltipStory.args = {};
