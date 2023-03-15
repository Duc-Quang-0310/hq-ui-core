import React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonStory } from '../stories/Button.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonStory />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
