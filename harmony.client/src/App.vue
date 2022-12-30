<template>
  <header>
    <Navbar />
  </header>
  <main class="color-background">
    <router-view />
  </main>
  <footer class="color-background container-fluid row sticky-bottom">
    <!-- <div class="col-12 d-flex justify-content-center mb-4 d-flex">
      <img class="img-fluid img-vfx pb-4 d-flex rounded" v-if="activeSong" :src="activeSong.coverImg" alt="">
      <audio id="player" v-if="activeSong" class="audio-size bg-white" controls autoplay
        :src="activeSong.songUrl"></audio>
    </div> -->
    <div v-if="activeSong" class="music-player col-12">
      <div class="song-bar">
        <div class="song-infos">
          <div class="image-container">
            <img class="img-fluid" :src="activeSong.coverImg" alt="" />
          </div>
          <div class="song-description">
            <p class="title">
              <router-link :to="{ name: 'ActivePage', params: { songId: activeSong._id } }">
                {{ activeSong.name }}
              </router-link>
            </p>
            <p class=" artist">
              <router-link :to="{ name: 'ProfilePage', params: { profileId: activeSong.artistId } }">
                {{ activeSong.artist.name }}
              </router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="progress-controller">
        <div class="control-buttons">
          <!-- <i class="mdi mdi-shuffle"></i> -->
          <audio id="player" class="bg-dark audio-vfx" controls autoplay :src="activeSong.songUrl"></audio>
          <i class="mdi mdi-loop"></i>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from "vue-router"
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    const route = useRoute()
    return {
      route,
      appState: computed(() => AppState),
      songs: computed(() => AppState.songs),
      activeSong: computed(() => AppState.activeSong),
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.img-vfx {
  height: 100px;
  width: 100px;
}

audio {
  background-color: black;
  color: black;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
  width: 100%;
}

.color-background {
  background-color: #B1BBD3;
}

.audio-size {
  width: 215vh;
  padding: 5px;
}

* {
  box-sizing: border-box;
  font-family: "circular std book", sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: #222;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: scroll;
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-panel {
  background-color: #09ff00;
  color: #ffa3d9;
  border-radius: 10em;

}

.music-player {
  --primary-color: #ddd;
  --secondary-color: #999;
  --green-color: #2d5;
  --padding: 1em;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 7rem;
  // padding: var(--padding);
  color: var(--primary-color);
  width: 100%;
}

i {
  color: var(--secondary-color);
}

i:hover {
  color: var(--primary-color);
}

.song-bar {
  position: absolute;
  left: var(--padding);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  width: 25%;
}

.song-infos {
  display: flex;
  align-items: center;
  gap: 1em;
}

.image-container {
  --size: 4.5em;
  flex-shrink: 0;
  width: var(--size);
  height: var(--size);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-description p {
  margin: 0.2em;
}

.title,
.artist {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.title:hover,
.artist:hover {
  text-decoration: underline;
}

.artist {
  color: var(--secondary-color);
}

.icons {
  display: flex;
  gap: 1em;
}

.progress-controller {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  color: var(--secondary-color);
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 2em;
}

.play-pause {
  display: inline-block;
  padding: 1em;
  background-color: var(--primary-color);
  color: #111;
  border-radius: 50%;
}

.play-pause:hover {
  transform: scale(1.1);
  color: #111;
}

.progress-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.progress-bar {
  height: 4px;
  border-radius: 10px;
  width: 30%;
  background-color: #ccc4;
}

.progress {
  position: relative;
  height: 100%;
  width: 30%;
  border-radius: 10px;
  background-color: var(--secondary-color);
}

.progress-bar:hover .progress {
  background-color: var(--green-color);
}

.progress-bar:hover .progress::after {
  content: "";
  position: absolute;
  --size: 1em;
  width: var(--size);
  height: var(--size);
  right: 0;
  border-radius: 50%;
  background-color: var(--primary-color);
  transform: translate(50%, calc(2px - 50%));
}

.other-features {
  position: absolute;
  right: var(--padding);
  display: flex;
  flex-direction: row;
  gap: 1em;
}

.volume-bar {
  display: flex;
  align-items: center;
  gap: .7em;
}

.volume-bar .progress-bar {
  width: 6em;
}

.volume-bar .progress-bar:hover .progress::after {
  --size: .8em;
}
</style>
