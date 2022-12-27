<template>

  <div class="pt-2 ">
    <h4 class="text-center">{{ song.name }}</h4>
    <img class="img-fluid img-size" :src="song.coverImg" alt="">
    <audio class="justify-content-center col-12" controls :src="song.songUrl"></audio>
    <button title="delete song?" class="btn btn-outline bg-danger mdi mdi-delete" v-if="song?.artistId == account.id"
      @click="deleteSong"></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
export default {
  props: { song: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),







      async deleteSong() {
        try {
          if (await Pop.confirm('delete song')) {
            await songsService.deleteSong(route.params.songId)
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.img-size {
  height: 30vh;
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