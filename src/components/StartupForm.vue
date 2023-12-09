<template>
  <div class="startup">
    <form @submit.prevent="submitForm">
      <label for="apiUrl">Ссылка на API:</label>
      <input v-model="formData.apiUrl" type="text" id="apiUrl" required>

      <label for="username">Логин:</label>
      <input v-model="formData.username" type="text" id="username" required>

      <label for="password">Пароль:</label>
      <input v-model="formData.password" type="password" id="password" required>

      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useAuthStore} from '@/store';
import {useRouter} from "vue-router";

const formData = ref({
  apiUrl: '',
  username: '',
  password: '',
});

const router = useRouter();
const authStore = useAuthStore();

const submitForm = () => {
  // Сохраняем данные в Pinia хранилище
  authStore.setApiUrl(formData.value.apiUrl);
  authStore.setUsername(formData.value.username);
  authStore.setPassword(formData.value.password);

  router.push('/video')

  // Здесь вы можете выполнить необходимые действия, такие как отправка запроса к вашему API
};
</script>

<style scoped>
.startup {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 100px;
}

form {
  display: flex;
  flex-direction: column;
  color: #fff;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
</style>
