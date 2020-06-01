<template>
  <div class="deck-display">
    <h2 class="deck-display__title title">{{ deck.title }}</h2>
    <div
      v-for="card in deck.cards"
      :key="card._id"
      class="deck-display__card-container card-container"
    >
      <flashcard
        class="deck-display__flashcard"
        :front="card.frontText"
        :back="card.backText"
      ></flashcard>
      <div class="deck-display__btns-col btns-col">
        <font-awesome-icon
          class="btns-col__btn btns-col__btn--edit btn"
          size="2x"
          icon="edit"
          @click="
            $emit('openEditor', {
              frontText: card.frontText,
              backText: card.backText,
              _id: card._id,
              deckTitle: deck.title,
            })
          "
        ></font-awesome-icon>
        <font-awesome-icon
          class="btns-col__btn btns-col__btn--delete btn"
          size="2x"
          icon="trash-alt"
          @click="$emit('deleteCard', { _id: card._id, deckTitle: deck.title })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheFlashcard from '@/components/TheFlashcard.vue';

import { Card, Deck } from '@/types';
export default Vue.extend({
  components: { flashcard: TheFlashcard },
  props: {
    deck: {
      type: Object as () => Deck, // https://frontendsociety.com/using-a-typescript-interfaces-and-types-as-a-prop-type-in-vuejs-508ab3f83480
      default() {
        return { cards: [] as Card[], title: 'Default Deck' };
      },
    },
  },
});
</script>

<style lang="scss">
.deck-display {
  text-align: center;
  border-left: 1px dashed #868686;
  padding: 0 15px;
  border-right: 1px dashed #868686;
}
.deck-display__card-container {
  margin: auto;
}
.deck-display__flashcard {
  margin: 20px;
}
.card-container {
  display: flex;
  max-width: 600px;
}
.btns-col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
