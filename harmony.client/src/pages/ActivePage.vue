<template>
  <div class="container-fluid">
    <div class="row cover-img card" :style="`background-image: url()`">
      <div v-if="song" class="col-12">
        <div class="d-flex pb-2">
          <img class="img-fluid mt-2" :src="song.coverImg" alt="">
          <div class="row m-2 align-items-center">
            <h1 class="">{{ song.name }}</h1>
            <!-- TODO add an album name -->
            <h3 class="">Likes go here</h3>
            <h3 class="">Stream Count go here</h3>
            <div class="col-12 ">
              <i class="elevation-5 mdi mdi-heart-outline fs-2 p-3 selectable bg-danger rounded"></i>
              <i v-if="song.isLiked == false"
                class="elevation-5 mdi mdi-heart-outline fs-2 p-3 selectable bg-danger rounded" @click="likeSong"></i>
              <i v-else class="elevation-5 mdi mdi-heart-broken fs-2 p-3 selectable bg-danger rounded"
                @click="removeLike(song.id)"></i>

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
import { likesService } from "../services/LikesService.js";
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
      },

      async likeSong() {
        try {
          await likesService.likeSong({ songId: route.params.songId })
        } catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
      async removeLike(likeId) {
        try {
          await likesService.removeLike(likeId)
        } catch (error) {
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
.card {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(5px);
}

.top-half {
  background-color: rgb(87, 84, 84);
  width: 100%;

}

.album-img {
  border-radius: 10%;
}

.bg-image {
  filter: blur(30px);
}

button {
  transition: background-color 1s ease-in-out;
}

button:hover {
  background-color: red;
}
</style>