

<template>
  <div class="component">
    <form @submit.prevent="createSong">
      <div class="form-group">
        <label for="exampleInputEmail1">song name</label>
        <input v-model="editable.name" type="text" class="form-control" id="name" aria-describedby="emailHelp"
          placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">song link</label>
        <input v-model="editable.songUrl" type="url" class="form-control" id="songLink" aria-describedby="emailHelp"
          placeholder="Enter song link">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">song img</label>
        <input v-model="editable.coverImg" type="url" class="form-control" id="songImg" aria-describedby="emailHelp"
          placeholder="Enter img">
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createSong() {
        try {
          const song = await songsService.createSong(editable.value)
          editable.value = {}

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