<template>
  <div class="pt-2  col-6 d-flex selectable" @click="findSongById(song._id)">
    <div>
      <img class="img-fluid img-size d-flex  pb-2" :src="song.coverImg" alt="">
    </div>
    <!-- <h6 class="d-flex mt-5 ">{{ song.artist.name }} {{ song.name }}</h6> -->
    <div class="row px-2">
      <h6 class="pt-4">{{ song.name }}</h6>
      <h6>{{ song.artist.name }}</h6>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
import { logger } from "../utils/Logger.js";
export default {
  props: { song: { type: Object, required: true } },

  setup() {
    return {

      account: computed(() => AppState.account),
      activeSong: computed(() => AppState.activeSong),

      async findSongById(song) {
        try {
          await songsService.findSongById(song)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      pauseSong() {
        try {
          const player = document.getElementById('player')
          player.pause()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      playSong() {
        const player = document.getElementById('player')
        player.play()
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.img-size {
  height: 10vh;
}

.img-size:hover {
  transform: scale(1.05);
  box-shadow: solid black 10em;
  transition: ease-in 100ms;
}

audio:hover,
audio:focus,
audio:active {
  -webkit-box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.4);
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.4);
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  transform: scale(1.05);
}

audio {
  -webkit-transition: all 0.5s linear;
  -moz-transition: all 0.5s linear;
  -o-transition: all 0.5s linear;
  transition: all 0.5s linear;
  -moz-box-shadow: 2px 2px 4px 0px #006773;
  -webkit-box-shadow: 2px 2px 4px 0px #006773;
  box-shadow: 2px 2px 4px 0px #006773;
  -moz-border-radius: 7px 7px 7px 7px;
  -webkit-border-radius: 7px 7px 7px 7px;
  border-radius: 7px 7px 7px 7px;
}

audio {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  border: 1px solid;
  font-weight: 700;
  background-color: white;
  text-align: center;
  transition: all 0.2s;
}
</style>