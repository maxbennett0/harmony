<template>
  <!-- <div class="component">

    <h6 class="d-flex mt-5 ">{{ song.artist.name }} {{ song.name }}</h6>
    <div class="row px-2">
      <h6 class="pt-4">{{ profile.name }}</h6>

    </div>
  </div> -->

  <router-link :to="{ name: 'ProfilePage', params: { profileId: profile._id } }">

    <div @click="setActive" class="pt-2  col-6 d-flex selectable ">
      <img class=" img-size d-flex  pb-2" :src="profile?.picture" alt="">
      <!-- <h6 class="d-flex mt-5 ">{{ song.artist.name }} {{ song.name }}</h6> -->
      <div class="row px-2">
        <h6 class="pt-4">{{ profile?.name }}</h6>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
export default {
  props: { profile: { type: Object, required: true } },
  setup(props) {
    return {

      setActive() {
        try {
          AppState.activeProfile = props.profile
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
  height: 10vh;
  // width: 10vh;
}

.img-size:hover {
  transform: scale(1.05);
  box-shadow: solid black 10em;
  transition: ease-in 100ms;
}
</style>