import '../node_modules/uswds/dist/css/uswds.min.css';
import '../node_modules/uswds/dist/js/uswds.min.js';
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("openacr-editor"),
});

export default app;
