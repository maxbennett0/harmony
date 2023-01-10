<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="song" class="col-12">
        <div class="d-flex pb-2">
          <img class="img-fluid mt-2" :src="song.coverImg" alt="">
          <div class="row m-2 align-items-center">
            <h1 class="elevation-5">{{ song.name }}</h1>
            <!-- TODO add an album name -->
            <h1 class="elevation-5">Likes: {{ likes.length }}</h1>
            <h1 class="elevation-5">Stream Count go here</h1>
            <div class="col-12 ">
              <i v-if="foundMe" class="elevation-5 mdi mdi-heart-broken fs-2 p-3 selectable bg-danger rounded"
                @click="removeLike(foundMe.id)"></i>
              <i class="elevation-5 mdi mdi-heart-outline fs-2 p-3 selectable bg-danger rounded" @click="likeSong"></i>
              <button v-if="song?.artistId == account.id" title="delete song?"
                class="btn btn-outline bg-danger mdi mdi-delete" @click="deleteSong(song.id)"></button>
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
        Pop.error(error.message)
      }
    }

    async function getLikesBySongId() {
      try {
        await likesService.getLikesBySongId(route.params.songId)
      } catch (error) {
        Pop.error(error.message)
        logger.log(error)
      }
    }

    onMounted(() => {
      findSongById();
      getCommentsBySongId();
      getLikesBySongId();
    });
    return {
      route,
      songs: computed(() => AppState.songs),
      song: computed(() => AppState.activeSong),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      likes: computed(() => AppState.likes),
      foundMe: computed(() => AppState.likes.find(l => l.accountId == AppState.account.id)),
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