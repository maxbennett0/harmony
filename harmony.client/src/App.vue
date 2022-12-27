<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer class="color-background">
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
      chosenSong: computed(() => AppState.songs.find(s => s._id == route.params.songId))
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
