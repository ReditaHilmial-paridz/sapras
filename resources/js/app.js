import { createApp } from 'vue';
import App from './App.vue';  // Ubah path agar sesuai dengan struktur yang benar
import router from './router'; // Tambahkan router
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(router); // Gunakan router
app.mount('#app');

