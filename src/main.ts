 import { mount } from 'svelte';
import App from './ui/Editor.svelte';

const app = mount(App, {
  target: document.body,
});

export default app; 