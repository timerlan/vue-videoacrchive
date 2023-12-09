import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        apiUrl: '',
        username: '',
        password: '',
    }),
    actions: {
        setApiUrl(apiUrl) {
            this.apiUrl = apiUrl;
        },
        setUsername(username) {
            this.username = username;
        },
        setPassword(password) {
            this.password = password;
        },
    },
});
