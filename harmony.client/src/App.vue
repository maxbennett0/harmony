<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer v-if="activeSong" class="container-fluid d-flex sticky-bottom bg-dark p-3">
    <audio id="player" class="bg-dark" @loadeddata="setSongDuration" hidden :src="activeSong.songUrl">
    </audio>
    <div class="icons">
      <i id="loopButton" class="mdi mdi-sync text-white selectable" @click="loopSong(activeSong.id)"></i>
      <i id="shuffleButton" class="mdi mdi-shuffle text-white selectable" @click="findShuffleSong(activeSong.id)"></i>
      <i id="previousButton" class="mdi mdi-skip-previous text-white selectable"
        @click="findPreviousSong(activeSong.id)"></i>
      <i v-if="activeSong && playState" id="pauseButton" class="mdi mdi-pause text-white selectable"
        @click="pauseSong"></i>
      <i v-else-if="!playState && activeSong" id="playButton" class="mdi mdi-play text-white selectable"
        @click="playSong"></i>
      <i id="nextButton" class="mdi mdi-skip-next text-white selectable" @click="findNextSong(activeSong.id)"></i>
    </div>
    <h3 id="currentTime" class="align-items-center d-flex mx-2">
      <span>{{ formatTime(currentTime) }}</span>
    </h3>
    <div class="d-flex align-items-center bar-length">
      <div class="progress text-dark">
        <div preload="metadata" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25"
          aria-valuemin="0" :aria-valuemax=songDuration>
        </div>
        <input id="seekSlider" preload="metadata" type="range" min="0" :max="songDuration" v-model="currentTime"
          @mouseup="setSongTime" @mousedown="seeking = true">
      </div>
      <h3 id="endingTime" class="align-items-center d-flex mx-2">
        {{ formatTime(songDuration) }}
      </h3>
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
    const currentTime = ref(0)
    const songDuration = ref(0)
    const playState = ref(false)
    const seeking = ref(false)
    const playInterval = ref(null)
    const autoPlay = ref(false)
    const route = useRoute()

    function incrementPlayer() {
      if (!seeking.value && playState.value) currentTime.value += 1
      if (currentTime.value >= songDuration.value) {
        logger.log('song ended')
        pauseSong()
        currentTime.value = 0
        if (autoPlay.value) {
          nextSong()
          playSong()
        }
      }
    }
    function playSong() {
      logger.log('playing')
      const player = document.getElementById('player')
      playState.value = true
      if (!playInterval.value) {
        playInterval.value = setInterval(incrementPlayer, 1000)
      }
      player?.play()
    }
    function pauseSong() {
      logger.log('pausing')
      playState.value = false
      playInterval.value = clearInterval(playInterval.value)
      player.pause()
    }
    function nextSong(id) {
      const songs = AppState.songs
      let foundIndex = songs.findIndex(s => s.id == id)
      let nextSongIndex = foundIndex + 1
      let nextSong = songs[nextSongIndex]
      return nextSong
    }
    function previousSong(id) {
      const songs = AppState.songs
      let foundIndex = songs.findIndex(s => s.id == id)
      let previousSongIndex = foundIndex - 1
      let previousSong = songs[previousSongIndex]
      return previousSong
    }
    return {
      seeking,
      currentTime,
      songDuration,
      route,
      playInterval,
      playState,
      appState: computed(() => AppState),
      songs: computed(() => AppState.songs),
      activeSong: computed(() => AppState.activeSong),
      playSong,
      pauseSong,
      previousSong,

      setSongTime(ev) {
        logger.log(ev.target.value)
        let set = parseInt(ev.target.value)
        const player = document.getElementById('player')
        player.currentTime = set
        currentTime.value = set
        seeking.value = false
        playSong()
      },
      // NOTE find song by the id. with id, find index, play song with at new index
      shuffleSong() {
        const songs = AppState.songs
        let shuffleIndex = Math.floor(Math.random() * (songs.length - 1))
        let shuffled = songs[shuffleIndex]
        logger.log(shuffled)
        return shuffled
      },
      async loopSong(songId) {
        try {
          await songsService.findSongById(songId)
          player.loop = !player.loop
          console.log(player.loop)
          return
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },


      async findNextSong(songId) {
        logger.log('next song')
        let foundNextSong = nextSong(songId)
        logger.log(foundNextSong)
        try {
          await songsService.findSongById(foundNextSong.id)
          playSong()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async findPreviousSong(songId) {
        logger.log('previous song')
        let foundPreviousSong = previousSong(songId)
        logger.log(foundPreviousSong)
        try {
          await songsService.findSongById(foundPreviousSong.id)
          playSong()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async findShuffleSong(songId) {
        let foundShuffleSong = this.shuffleSong(songId)
        logger.log(foundShuffleSong)
        try {
          await songsService.findSongById(foundShuffleSong.id)
          playSong()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      setSongDuration(ev) {
        let audioTag = ev.target
        let duration = audioTag.duration
        songDuration.value = duration
      },
      formatTime(s) {
        let minutes = Math.floor(s / 60)
        let seconds = Math.trunc(s % 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ':' + seconds
      }
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

.icons {
  width: 20%;
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

#previousButton {
  font-size: xx-large;
}

#nextButton {
  font-size: xx-large;
}

#shuffleButton {
  font-size: xx-large;
}

#loopButton {
  font-size: xx-large;
}

#seekSlider {
  width: 100%;
}

#currentTime {
  margin: 0%;
}

#endingTime {
  margin: 0%;
}

.bar-length {
  width: 100%;
}

.progress {
  width: 100%;
}

.progress-bar {
  width: 100%;
}

#currentTime {
  margin: 0px;
  padding: 0%;
}
</style>
