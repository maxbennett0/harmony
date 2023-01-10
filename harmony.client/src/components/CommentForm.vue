<template>
  <!-- <div class="component">
    <form @submit.prevent="createComment()">
      <div class="form-group">
        <label for="body">comment</label>
        <input v-model="editable.body" type="text" class="form-control" id="body" aria-describedby="emailHelp"
          placeholder="Enter comment">
      </div>

    </form>
  </div>
  <div> -->
  <form @submit.prevent="createComment()" class="m-2">
    <div class=" pt-1 py-2 px-2 pb-2 col-3 card d-flex">
      <label for="exampleFormControlTextarea1" class="form-label"></label>
      <img :src="account.picture" alt="" class="img-fluid comment-img elevation-3" />
      <textarea placeholder="comment" v-model="editable.body" class="form-control" id="exampleFormControlTextarea1"
        rows="1"></textarea>
    </div>
    <button type="submit" class="btn btn-warning">Comment</button>
  </form>

  <!-- </div> -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { commentsService } from "../services/CommentsService.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {

      comment: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      editable,
      async createComment() {
        try {
          editable.value.songId = route.params.songId
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },
      async getProfile() {
        try {
          await accountService.getProfile(route.params.profileId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }



    }
  }
};
</script>


<style lang="scss" scoped>
.card {
  background-color: rgb(51 27 61 / 14%);
  backdrop-filter: blur(5px);
}

.comment-img {
  width: 5vh;
  height: 5vh;
}
</style>