<template>
  <div class="app u-scroller">
    <div class="app__nav">
      <router-link class="nav__link" to="/home">Home</router-link>
      <router-link class="nav__link" to="/login">Login/Logout</router-link>
    </div>
    <router-view class="app_router-view" />
  </div>
</template>

<style lang="scss">
@import './styles/_variables.scss';
// Blocks should only be concerned with internal positioning like (eg. padding).
// Position of the whole block (eg. margin) should rely on parent (.app__nav nav)
.app__nav {
  display: flex;
  justify-content: space-between;
  padding: 5px 25px;
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
