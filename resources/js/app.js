import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap dan ikon
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Axios
import axios from 'axios';

// Buat instance aplikasi Vue
const app = createApp(App);

// Konfigurasi Axios agar bisa diakses di seluruh aplikasi
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; // Sesuaikan dengan backend Laravel
app.config.globalProperties.$axios = axios;

// Gunakan router
app.use(router);

// Mount aplikasi ke elemen #app
app.mount('#app');
