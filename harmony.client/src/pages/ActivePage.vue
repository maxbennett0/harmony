<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="song" class="col-12">
        <div class="d-flex">
          <img class="img-fluid album-img mt-2" :src="song.coverImg" alt="">
          <div class="row m-2 align-items-center">
            <h1>{{ song.name }}</h1>
            <!-- TODO add an album name -->
            <h1>Likes go here</h1>
            <h1>Stream Count go here</h1>
            <div class="col-12">
              <button class="btn btn-danger mx-3 p-3">Like</button>
              <button class="btn btn-success mx-3 p-3"><i class="mdi mdi-motion-play-outline"></i> Play {{ song.name
              }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
import { useRoute } from "vue-router";
export default {
  setup() {

    const route = useRoute();

    async function findSongById() {
      try {
        await songsService.findSongById(route.params.songId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      findSongById();
    })

    return {
      songs: computed(() => AppState.songs),
      song: computed(() => AppState.activeSong)
    }
  }
};
</script>


<style lang="scss" scoped>
.top-half {
  background-color: rgb(87, 84, 84);
  width: 100%;

}

.album-img {
  border-radius: 10%;
}
</style>