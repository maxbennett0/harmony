<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer class="color-background container-fluid row mb-3">
    <!-- <div class="col-2 d-flex">
      <img class="img-fluid" v-if="activeSong" :src="activeSong.coverImg" alt="">
    </div> -->
    <audio id="player" v-if="activeSong" class="audio-size" controls autoplay :src="activeSong.songUrl"></audio>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from "vue-router"
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    const route = useRoute()
    return {
      route,
      appState: computed(() => AppState),
      songs: computed(() => AppState.songs),
      activeSong: computed(() => AppState.activeSong),
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.color-background {
  background-color: #B1BBD3;
}

.audio-size {
  width: 215vh;
}
</style>
