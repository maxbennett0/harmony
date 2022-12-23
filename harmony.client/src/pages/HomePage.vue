<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
</template>

<script>

import { ref } from "vue"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { firebaseService } from "../services/FirebaseService.js"

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
