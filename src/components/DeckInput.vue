<template>
  <div class="deck-input">
    <h2 class="deck-input__title title">Create a Deck</h2>
    <p class="form__top-label">Title</p>
    <input v-model="newTitle" class="form__text-input" type="text" />
    <div class="deck-input__add-icon-wrapper">
      <font-awesome-icon
        class="deck-input__add-icon btn"
        color="rgb(46, 204, 113)"
        size="2x"
        icon="plus-square"
        @click="newTitle !== '' ? createDeck() : null"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Deck, Card } from '@/types';
export default Vue.extend({
  data() {
    return {
      newTitle: '' as string,
    };
  },
  methods: {
    createDeck: function() {
      const newDeck = {
        cards: [] as Card[],
        title: this.newTitle,
      } as Deck;
      this.$emit('createDeck', newDeck);
      this.newTitle = '';
    },
  },
});
</script>

<style scoped>
.deck-input {
  margin: auto;
  text-align: center;
}

.deck-input__add-icon {
  margin-top: 10px;
}
</style>
