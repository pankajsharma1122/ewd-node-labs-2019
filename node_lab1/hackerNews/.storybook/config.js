import { configure, addDecorator } from '@storybook/react';

function loadStories() {
  require('../stories/hackerApp.js');
}

configure(loadStories, module);