<template>
  <div class="container-fluid">
    <SongForm />
    <div class="row justify-content-center">
      <div v-for="s in songs" class="col-3 d-flex">
        <div class="col-8 d-flex">
          <SongCard :song="s" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted, computed } from "vue"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
// import { firebaseService } from "../services/FirebaseService.js"
import { songsService } from "../services/SongsService.js"
import { AppState } from "../AppState.js"
import SongCard from "../components/SongCard.vue"
import SongForm from "../components/SongForm.vue"

export default {
  setup() {
    // NOTE also for firebase stuff
    // const image = ref([])
    async function getSongs() {
      try {
        await songsService.getSongs();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getSongs();
    });
    return {
      songs: computed(() => AppState.songs)
      // FIXME FIREBASE PROBLEMS
      // image,
      // setImage(e) {
      //   image.value = e.target.files
      //   logger.log('New image: ', image.value)
      // },
      // async upload() {
      //   try {
      //     const url = await firebaseService.upload(image.value[0])
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.toast(error.message, 'error')
      //   }
      // }
    };
  },
  components: { SongCard, SongForm }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
