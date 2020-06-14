<template>
  <div class="home">
    <section class="home__section editing-section">
      <deck-input class="editing-section__deck-input" @createDeck="createDeck"></deck-input>
      <card-input
        class="editing-section__card-input"
        :selected-deck="state.selectedDeck"
        :decks="state.decks"
        @addCard="addCard"
        @changeSelectedDeck="changeSelectedDeck"
      ></card-input>
    </section>
    <section class="home__section display-section">
      <deck-display
        v-for="deck in decks"
        :key="deck.title"
        class="display-section__deck-display"
        :deck="deck"
        @deleteCard="deleteCard"
        @openEditor="openEditor"
      ></deck-display>
      <card-editor
        v-if="state.showEditor"
        class="display-section__card-editor"
        :edit-payload="state.editPayload"
        @cancelEdit="state.showEditor = false"
        @editCard="editCard"
      ></card-editor>
    </section>
  </div>
</template>

<script lang="ts">
import { reactive, computed } from '@vue/composition-api';

import { Deck, NewCardPayload, DeleteCardPayload, EditCardPayload } from '@/types';

import store from '../store';

import CardEditor from '@/components/CardEditor.vue';
import DeckInput from '@/components/DeckInput.vue';
import CardInput from '@/components/CardInput.vue';
import DeckDisplay from '@/components/DeckDisplay.vue';

export default {
  name: 'ComposVuexPersist',
  components: { CardInput, DeckDisplay, DeckInput, CardEditor },
  setup() {
    const decks = computed(() => {
      return store.getters.decksMod.decks;
    });
    console.log('decks', decks);
    const state = reactive({
      selectedDeck: decks ? (decks.value[0].title as string) : ('' as string),
      showEditor: false as boolean,
      editPayload: {} as EditCardPayload,
    });

    const createDeck = (deck: Deck) => {
      store.commit.decksMod.addDeck(deck);
      state.selectedDeck = deck.title;
    };
    const addCard = (payload: NewCardPayload) => {
      payload.deckTitle = state.selectedDeck;
      store.commit.decksMod.addCard(payload);
    };
    const editCard = (payload: EditCardPayload) => {
      store.commit.decksMod.editCard(payload);
      state.showEditor = false;
    };
    const deleteCard = (payload: DeleteCardPayload) => {
      store.commit.decksMod.deleteCard(payload);
    };
    const changeSelectedDeck = (title: string) => {
      state.selectedDeck = title;
    };
    const openEditor = (payload: EditCardPayload) => {
      state.editPayload = payload;
      state.showEditor = true;
    };

    return {
      decks,
      state,
      createDeck,
      addCard,
      editCard,
      deleteCard,
      changeSelectedDeck,
      openEditor,
    };
  },
};
</script>
