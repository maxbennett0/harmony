

<template>
  <div class="component">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">song name</label>
        <input v-model="editable.name" type="text" class="form-control" id="name" aria-describedby="emailHelp"
          placeholder="Enter name">
      </div>
      <!-- <div class="form-group">
        <label for="exampleInputEmail1">song img</label>
        <input v-model="editable.coverImg" type="url" class="form-control" id="songImg" aria-describedby="emailHelp"
          placeholder="Enter img">
      </div> -->
    </form>
    <form @submit.prevent="uploadSong()">
      <div class="form-group">
        <label class="btn-dark" for="formFile">choose a song</label>
        <input @change="setAudio" name="file" type="file" class="form-control inputfile p-2 " id="songLink"
          accept="audio/*" required aria-describedby="emailHelp" placeholder="upload song">
        <button class="btn mt-2 btn btn-light">upload</button>
      </div>
    </form>
    <form @submit.prevent="upload" class="p-1" action="">
      <div class="mb-3">
        <label for="formFile" class="form-label">Image</label>
        <input @change="setImage" class="form-control" type="file" accept="image/*" required />
      </div>
      <button class="btn mt-2 btn-warning">upload</button>
    </form>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
import { Modal } from "bootstrap";
import { firebaseService } from "../services/FirebaseService.js";
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    const editable = ref({})
    const image = ref([])
    const media = ref({})
    return {
      editable,
      setImage(e) {
        image.value = e.target.files
        logger.log('New image: ', image.value)
      },
      async upload() {
        try {
          const url = await firebaseService.upload(image.value[0])
          editable.value.coverImg = url
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      setAudio(e) {
        media.value = e.target.files
        logger.log('New audo: ', media.value)
      },
      async uploadSong() {
        try {
          const url = await firebaseService.uploadSong(media.value[0])
          editable.value.songUrl = url
          await this.createSong()
        } catch (error) {
        }

      },




      async createSong() {
        try {
          const song = await songsService.createSong(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
        } catch (error) {
          // Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>