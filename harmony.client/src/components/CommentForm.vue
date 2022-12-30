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
  <form @submit.prevent="createComment()">
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label"></label>
      <textarea placeholder="comment" v-model="editable.body" class="form-control" id="exampleFormControlTextarea1"
        rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-warning">comment</button>
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
        debugger
        try {
          editable.value.songId = route.params.songId
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },


    }
  }
};
</script>


<style lang="scss" scoped>

</style>