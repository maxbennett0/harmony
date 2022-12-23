<template>
  <div class="container-fluid">
    <audio controls loop
      src="https://firebasestorage.googleapis.com/v0/b/harmony-ad9d7.appspot.com/o/Media%2Fsoudiereafter.mp3?alt=media&token=c8484690-59ea-4268-9b19-5f6c8c4e8436%22%3E"></audio>
  </div>
</template>

<script>

import { ref } from "vue"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
// import { firebaseService } from "../services/FirebaseService.js"

export default {
  setup() {
    // NOTE also for firebase stuff
    // const image = ref([])

    return {
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
    }
  }
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
