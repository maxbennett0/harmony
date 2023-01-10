<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer class="container-fluid sticky-bottom bg-dark p-3">
    <div>
      <audio v-if="activeSong" id="player" class="bg-dark" hidden autoplay :src="activeSong.songUrl">
      </audio>
      <i id="playButton" class="mdi mdi-play text-white selectable" @click="playSong"></i>
      <i id="pauseButton" class="mdi mdi-pause text-white selectable" @click="pauseSong"></i>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from "vue-router"
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { logger } from "./utils/Logger.js"

export default {
  setup() {
    const route = useRoute()
    return {
      route,
      appState: computed(() => AppState),
      songs: computed(() => AppState.songs),
      activeSong: computed(() => AppState.activeSong),

      playSong() {
        const player = document.getElementById('player')
        player.play()
      },
      pauseSong() {
        player.pause()
      },
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

#grad {
  background-image: linear-gradient(to bottom right, red, yellow);
}


body {
  margin: 0;
  padding: 0;
  // background-color: #222;
  background-image: linear-gradient(to bottom right, #93A5CF, #E4EfE9);

  font-size: 14px;
  overflow-x: hidden;
  overflow-y: scroll;
}

footer {
  min-width: 100%;
  margin: 0%;
  padding: 0%;
}

#playButton {
  font-size: xx-large;
}

#pauseButton {
  font-size: xx-large;
}

#progress {
  width: 85%;
}
</style>
