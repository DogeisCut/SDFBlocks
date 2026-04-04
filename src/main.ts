 import { mount } from 'svelte';
import App from './ui/Editor.svelte';

const app = mount(App, {
  target: document.getElementById('app') || document.body,
});

export default app; 