<template>
  <div class="component">



    <h1 class="text-center pt-2">Search results</h1>
    <div class="row justify-content-center pt-3 pb-2 gap-2 p-5">
      <div v-for="s in songs" class="d-flex card">
        <div>
          <SongCard :song="s" />
        </div>
      </div>
    </div>
  </div>

  <div class=" row justify-content-center pt-3 pb-2 gap-2 p-5">

    <div v-for="p in profiles" class="d-flex card">
      <ProfileCard :profile="p" />
    </div>
  </div>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import SongCard from "../components/SongCard.vue";
import ProfileCard from "../components/ProfileCard.vue";
export default {
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      songs: computed(() => AppState.songs),
    };
  },
  components: { SongCard, ProfileCard }
};
</script>


<style lang="scss" scoped>
.card {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(5px);
}
</style>