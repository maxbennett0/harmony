<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer class="color-background container-fluid row ">
    <div class="col-12 d-flex justify-content-center mb-4 d-flex ">
      <img class="img-fluid img-vfx pb-4 d-flex rounded" v-if="activeSong" :src="activeSong.coverImg" alt="">
      <audio id="player" v-if="activeSong" class="audio-size" controls autoplay :src="activeSong.songUrl"></audio>
    </div>
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

.img-vfx {
  height: 100px;
  width: 100px;
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
