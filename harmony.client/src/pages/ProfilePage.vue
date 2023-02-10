<template>
  <div class="row cover-img card" :style="`background-image: url()`">
    <div class="col-8 d-flex align-items-center justify-content-center">
      <img :src="profile?.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-3">
      <div class="bg-transparent rounded  p-5">
        <h1 class="">
          {{ profile?.name }}
        </h1>
        <!-- <h2>{{ profile }}</h2> -->
        <h2>Uploaded songs: {{ songs.songUrl?.length }}</h2>
        <h2>followers:</h2>
        <button class="btn btn-success"><i class="mdi mdi-check"></i>follow</button>
      </div>
    </div>
  </div>
  <!-- <div class="col-12 d-flex align-items-center justify-content-around">
    <div class="row cover-img"></div>
    <h2>{{ profile?.bio }}</h2>
    <h4>{{ profile.artist.songUrl }}</h4>
  </div> -->

  <div class="row container-fluid">

  </div>

  <div class="d-flex  pt-3 pb-2 gap-2 p-5">

    <div class="row">
      <h4>Artist songs</h4>
      <div class="" v-for="s in mySongs">
        <div>
          <SongCard :song="s" />
        </div>
      </div>
      <div v-for="l in myLikes">
        <h4>My Liked Songs</h4>
        <div>
          <SongCard :song="l.song" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";
import { followersService } from "../services/FollowersService.js";
import { songsService } from "../services/SongsService.js";
import { likesService } from "../services/LikesService.js"
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

    async function getFollowersByProfileId() {
      try {
        await followersService.getFollowersByProfileId(route.params.profileId)
      } catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }

    async function getFollowing() {
      try {
        await followersService.getFollowing();
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getMySongs() {
      try {
        await songsService.getMySongs(route.params.profileId)
      } catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getMyLikes() {
      try {
        await likesService.getMyLikes(route.params.profileId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getProfile();
      getMySongs();
      getFollowersByProfileId();
      getMyLikes();
    });
    return {
      route,
      profile: computed(() => AppState.activeProfile),
      mySongs: computed(() => AppState.mySongs),
      songs: computed(() => AppState.songs),
      myLikes: computed(() => AppState.myLikes),
      myFollowers: computed(() => AppState.myFollowers),
      followers: computed(() => AppState.followers),



    };
  },
  components: { SongCard }
};
</script>


<style lang="scss" scoped>
.card {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(5px);
}
</style>