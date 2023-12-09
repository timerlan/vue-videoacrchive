import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import StartupForm from '@/components/StartupForm.vue';
import VideoPlayer from "@/components/VideoPlayer.vue";
import './style/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: StartupForm },
        { path: '/video', component: VideoPlayer },
        // Другие маршруты здесь...
    ],
});

app.use(router);

app.mount('#app');
