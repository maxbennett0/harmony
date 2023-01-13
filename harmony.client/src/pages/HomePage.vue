<template>
  <div class="container-fluid"><!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade modal-background" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header modal-vfx">
            <h5 class="modal-title" id="exampleModalLabel">upload song?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-color">
            <SongForm />
          </div>
          <div class="modal-footer modal-vfx">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="upload" class="p-1" action="">
      <div class="mb-3"> <label for="" class="form-label">Title</label>
        <input type="text" class="form-control" placeholder="Title..." required />
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Image</label>
        <input @change="setImage" class="form-control" type="file" accept="image/*" required />
      </div>
      <button class="btn mt-2 btn-warning">Submit</button>
    </form>


    <div class="row justify-content-center pt-3 pb-2 gap-2 p-5">
      <div v-for="s in songs" class="d-flex card">
        <div>
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
import { firebaseService } from "../services/FirebaseService.js"
import { songsService } from "../services/SongsService.js"
import { AppState } from "../AppState.js"
import SongCard from "../components/SongCard.vue"
import SongForm from "../components/SongForm.vue"

export default {
  setup() {
    // NOTE also for firebase stuff
    const image = ref([])
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
      songs: computed(() => AppState.songs),
      // FIXME FIREBASE PROBLEMS
      image,
      setImage(e) {
        image.value = e.target.files
        logger.log('New image: ', image.value)
      },
      async upload() {
        try {
          const url = await firebaseService.upload(image.value[0])
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    };
  },
  components: { SongCard, SongForm }
}
</script>

<style scoped lang="scss">
.modal-vfx {
  background-color: #93A5CF;
}

.modal-color {
  background-color: #83cad8;
}

.modal-background {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(40px);
}

.card {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(5px);
}

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
