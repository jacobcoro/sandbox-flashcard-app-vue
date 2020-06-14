<template>
  <div class="app u-scroller">
    <div class="app__nav nav">
      <router-link class="nav__link" to="/VanillaCRUD">0: Vanilla Vue CRUD</router-link>
      <router-link class="nav__link" to="/VuexPersisted">1: Vuex Persisted</router-link>
      <router-link class="nav__link" to="/CompositionApiVanilla">2: Composition API</router-link>
      <router-link class="nav__link" to="/ComposVuexPersist">3: ComposVuexPersist</router-link>
    </div>
    <router-view class="app_router-view" />
  </div>
</template>

<style lang="scss">
@import './styles/main.scss';
// Blocks should only be concerned with internal positioning like (eg. padding).
// Position of the whole block (eg. margin) should rely on parent (.app__nav nav)
.nav {
  padding: 5px 0px;
  text-align: center;
  width: 100%;
  background-color: $secondary;
  &__link {
    font-weight: bold;
    color: white;
    padding: 5px 10px;
    &.router-link-exact-active {
      color: $primary;
    }
  }
}
</style>
