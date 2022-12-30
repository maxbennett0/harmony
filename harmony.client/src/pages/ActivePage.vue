<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="song" class="col-12">
        <div class="d-flex">
          <img class="img-fluid album-img mt-2" :src="song.coverImg" alt="">
          <div class="row m-2 align-items-center">
            <h1>{{ song.name }}</h1>
            <!-- TODO add an album name -->
            <h1>Likes go here</h1>
            <h1>Stream Count go here</h1>
            <div class="col-12">
              <i class="mdi mdi-heart-outline fs-2 p-3 selectable bg-danger rounded"></i>
              <button v-if="song?.artistId == account.id" title="delete song?"
                class="btn btn-outline bg-danger mdi mdi-delete" @click="deleteSong"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <CommentForm />
  </div>

  <div v-for="c in comments">
    {{ c.body }}
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { songsService } from "../services/SongsService.js";
import { useRoute, useRouter } from "vue-router";
import CommentForm from "../components/CommentForm.vue";
import { commentsService } from "../services/CommentsService.js";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    async function findSongById() {
      try {
        await songsService.findSongById(route.params.songId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }


    async function getCommentsBySongId() {

      try {
        await commentsService.getCommentsBySongId(route.params.songId)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      findSongById();
      getCommentsBySongId()
    });
    return {
      songs: computed(() => AppState.songs),
      song: computed(() => AppState.activeSong),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      async deleteSong() {
        try {
          await songsService.deleteSong(route.params.songId);
          router.push({ name: "Home" });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { CommentForm }
};
</script>


<style lang="scss" scoped>
.top-half {
  background-color: rgb(87, 84, 84);
  width: 100%;

}

.album-img {
  border-radius: 10%;
}
</style>