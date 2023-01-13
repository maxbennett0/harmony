<template>
  <div class="col-12">

    <form action="" class="input-group" @submit.prevent="searchApi()">
      <input type="text" class="form-control" v-model="search.name">
      <button class="btn "><i class="mdi mdi-magnify"></i></button>
    </form>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
import { accountService } from "../services/AccountService.js";
import { useRouter } from "vue-router";
export default {
  setup(){
    const router = useRouter()
    const search = reactive({
      // query: ''
      name: ''
    })
  return {
    search,
    router,

    async searchApi(){
      try {
        // debugger
        await songsService.searchSongs(search)
        await accountService.searchProfiles(search)
        router.push({name: 'SearchPage'})
      } catch (error) {
        
      }
    },
    // async searchSongs(){
    //   try {
    //     await songsService.searchSongs(search)
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // },


    // async  searchProfiles(){
    //   try {
    //     await accountService.searchProfiles(search)
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>