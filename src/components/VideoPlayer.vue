<template>
  <div>
    <div class="source">
      <label for="streamSelect">Выберите видеопоток:</label>
      <select id="streamSelect" v-model="selectedStream" @change="switchStream">
        <option v-for="(stream, index) in videoStreams" :key="index" :value="index">
          {{ stream.name }}
        </option>
      </select>
    </div>

    <video ref="videoPlayer" controls></video>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import Hls from 'hls.js';
import {useAuthStore} from '@/store'; // Путь к хранилищу с авторизационными данными

const authStore = useAuthStore();
const videoPlayer = ref(null);
const videoStreams = ref([]);
const selectedStream = ref(0);

onMounted(() => {
  // Вызываем функцию для загрузки данных видеопотоков при монтировании компонента
  loadVideoStreams();
});

// Функция для загрузки данных видеопотоков
const loadVideoStreams = async () => {
  try {
    // Делаем запрос к серверу для получения данных видеопотоков
    const response = await axios.get(authStore.apiUrl, {
      withCredentials: true,
      auth: {
        username: authStore.username,
        password: authStore.password,
      },
    });

    // Сохраняем данные в хранилище
    videoStreams.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке данных видеопотоков:', error.message);
  }
};

// Функция для загрузки видеопотока
const loadVideoStream = () => {
  const selectedStreamInfo = videoStreams.value[selectedStream.value];

  if (Hls.isSupported()) {
    const hls = new Hls({
      xhrSetup: (xhr) => setAuthHeaders(xhr, {
        username: authStore.username,
        password: authStore.password,
      })
    });
    hls.loadSource(selectedStreamInfo.stream);
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      videoPlayer.value.controls = false;
      videoPlayer.value.play();
    });
  } else if (videoPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.value.src = selectedStreamInfo.stream;
  }
};

// Функция для смены выбранного видеопотока
const switchStream = () => {
  loadVideoStream();
};

// Функция для установки заголовков авторизации
const setAuthHeaders = (xhr, auth) => {
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(auth.username + ':' + auth.password));
};
</script>

<style scoped>
/* Здесь можно добавить стили по желанию */
</style>
