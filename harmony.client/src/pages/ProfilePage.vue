<template>
  <div class="row cover-img card" :style="`background-image: url()`">
    <div class="col-8 d-flex align-items-center justify-content-center">
      <img :src="profile?.artist.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-3">
      <div class="bg-transparent rounded  p-5">
        <h1 class="">
          {{ profile?.artist.name }}
        </h1>
        <!-- <h2>{{ profile }}</h2> -->
        <h2>uploaded songs:</h2>
      </div>
    </div>
  </div>
  <div class="col-12 d-flex align-items-center justify-content-around">
    <div class="row cover-img"></div>
    <h2>{{ profile?.bio }}</h2>
    <h4>{{ profile.artist.songUrl }}</h4>
  </div>
  <div class="d-flex justify-content-center" v-for="s in songs">
    <div v-if="profile.artist.id == s.artistId">
      <SongCard :song="s" />
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";
import { songsService } from "../services/SongsService.js";
import { useRoute } from "vue-router";
import SongCard from "../components/SongCard.vue";
export default {
  setup() {
    const route = useRoute();
    // async function getProfile() {
    //   try {
    //     logger.log('getting profile')
    //     await accountService.getAccount()
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.error(error.message)
    //   }
    // }
    async function getProfile() {
      try {
        await accountService.getProfile(route.params.profileId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getProfile();
    });
    return {
      route,
      profile: computed(() => AppState.activeSong),
      songs: computed(() => AppState.songs),
    };
  },
  components: { SongCard }
};
</script>


<style lang="scss" scoped>
.card {
  background-color: #D9D9D9;
}
</style>