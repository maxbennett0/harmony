<template>
  <nav class="navbar navbar-expand-lg navbar-color navbar-color px-3 ">
    <router-link class="navbar-brand " :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="/src/assets/Cartoon_space_rocket.png" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li>
      </ul>
      <div class="justify-content-center row">
        <SearchBar />
      </div>
      <button type="button" class=" btn mx-2 button-vfx" data-bs-toggle="modal" data-bs-target="#exampleModal">
        upload
      </button>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
import SearchBar from './SearchBar.vue'
export default {
  setup() {
    return {}
  },
  components: { Login, SearchBar }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}


.button-vfx {
  background-color: rgb(89, 169, 185);
}

.button-vfx:hover {
  background-color: blue;
}

.button-vfx:active {
  transform: translateY(2px);
  transition: ease-out 5ms 5ms 5ms;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.navbar-color {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #E4EfE9);
}
</style>
