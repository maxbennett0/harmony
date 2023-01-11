<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer class="container-fluid sticky-bottom bg-dark p-3">
    <audio v-if="activeSong" id="player" class="bg-dark" @loadeddata="setSongDuration" hidden :src="activeSong.songUrl">
    </audio>
    <i v-if="activeSong" id="shuffleButton" class="mdi mdi-shuffle text-white selectable"
      @click="findShuffleSong(activeSong.id)"></i>
    <i v-if="activeSong" id="previousButton" class="mdi mdi-skip-previous text-white selectable"
      @click="findPreviousSong(activeSong.id)"></i>
    <i id="playButton" class="mdi mdi-play text-white selectable" @click="playSong"></i>
    <i id="pauseButton" class="mdi mdi-pause text-white selectable" @click="pauseSong"></i>
    <i v-if="activeSong" id="nextButton" class="mdi mdi-skip-next text-white selectable"
      @click="findNextSong(activeSong.id)"></i>
    <h3 v-if="activeSong">
      <span id="currentTime">{{ songDuration }}</span>
    </h3>
    <div class="progress text-dark">
      <div preload="metadata" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25"
        aria-valuemin="0" :aria-valuemax=songDuration>
      </div>
      <input id="seekSlider" preload="metadata" type="range" min="0" :max=songDuration>
    </div>
  </footer>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from "vue-router"
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { songsService } from "./services/SongsService.js"
import { logger } from "./utils/Logger.js"
import Pop from "./utils/Pop.js"

export default {
  setup() {
    const songDuration = ref(0)
    const route = useRoute()
    return {
      songDuration,
      route,
      appState: computed(() => AppState),
      songs: computed(() => AppState.songs),
      activeSong: computed(() => AppState.activeSong),

      playSong() {
        const player = document.getElementById('player')
        player?.play()
      },
      pauseSong() {
        player.pause()
      },
      // NOTE find song by the id. with id, find index, play song with at new index
      nextSong(id) {
        const songs = AppState.songs
        let foundIndex = songs.findIndex(s => s.id == id)
        let nextSongIndex = foundIndex + 1
        let nextSong = songs[nextSongIndex]
        return nextSong
      },
      previousSong(id) {
        const songs = AppState.songs
        let foundIndex = songs.findIndex(s => s.id == id)
        let nextSongIndex = foundIndex - 1
        let nextSong = songs[nextSongIndex]
        return nextSong
      },
      shuffleSong() {
        const songs = AppState.songs
        let shuffleIndex = Math.floor(Math.random() * songs.length)
        let shuffled = songs[shuffleIndex]
        logger.log(shuffled)
        return shuffled
      },
      async findNextSong(songId) {
        let nextSong = this.nextSong(songId)
        logger.log(nextSong)
        try {
          await songsService.findSongById(nextSong.id)
          player?.play()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async findPreviousSong(songId) {
        let previousSong = this.previousSong(songId)
        logger.log(previousSong)
        try {
          await songsService.findSongById(previousSong.id)
          player?.play()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async findShuffleSong(songId) {
        let shuffleSong = this.shuffleSong(songId)
        logger.log(shuffleSong)
        try {
          await songsService.findSongById(shuffleSong.id)
          player?.play()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      setSongDuration(ev) {
        let audioTag = ev.target
        let songTime = songDuration.value = (audioTag.duration * 0.0166).toFixed(2)
        const secDuration = Math.floor((songTime /= 1000) % 60)
        return secDuration
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
