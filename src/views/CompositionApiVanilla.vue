<template>
  <div class="home">
    <section class="home__section editing-section">
      <deck-input class="editing-section__deck-input" @createDeck="createDeck"></deck-input>
      <card-input
        class="editing-section__card-input"
        :selected-deck="state.selectedDeck"
        :decks="state.decks"
        @addCard="addCard"
        @changeSelectedDeck="changeSelectedDeck()"
      ></card-input>
    </section>
    <section class="home__section display-section">
      <deck-display
        v-for="deck in state.decks"
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
import { reactive } from '@vue/composition-api';

import { Deck, Card, NewCardPayload, DeleteCardPayload, EditCardPayload } from '@/types';

import CardEditor from '@/components/CardEditor.vue';
import DeckInput from '@/components/DeckInput.vue';
import CardInput from '@/components/CardInput.vue';
import DeckDisplay from '@/components/DeckDisplay.vue';

import { v4 as uuid } from 'uuid';
import defaultDeck from '@/assets/defaultDeck.json';

export default {
  name: 'CompositionApiVanilla',
  components: { CardInput, DeckDisplay, DeckInput, CardEditor },
  setup() {
    const state = reactive({
      decks: [defaultDeck as Deck],
      selectedDeck: '' as string,
      showEditor: false as boolean,
      editPayload: {} as EditCardPayload,
    });
    const createDeck = (deck: Deck) => {
      state.decks.push(deck);
      state.selectedDeck = deck.title;
    };
    const addCard = (payload: NewCardPayload) => {
      const newCard: Card = {
        _id: uuid(),
        frontText: payload.frontText,
        backText: payload.backText,
      };
      for (const deck of state.decks) {
        if (deck.title === state.selectedDeck) {
          deck.cards.push(newCard);
          break;
        }
      }
    };
    const editCard = (payload: EditCardPayload) => {
      for (const deck of state.decks) {
        if (deck.title === payload.deckTitle) {
          for (const card of deck.cards) {
            if (card._id === payload._id) {
              card.frontText = payload.frontText;
              card.backText = payload.backText;
              break;
            }
          }
          break;
        }
      }
      state.showEditor = false;
    };
    const deleteCard = (payload: DeleteCardPayload) => {
      for (const deck of state.decks) {
        if (deck.title === payload.deckTitle) {
          for (const card of deck.cards) {
            if (card._id === payload._id) {
              deck.cards.splice(deck.cards.indexOf(card), 1);
              break;
            }
          }
          break;
        }
      }
    };
    const changeSelectedDeck = (title: string) => {
      state.selectedDeck = title;
    };
    const openEditor = (payload: EditCardPayload) => {
      state.editPayload = payload;
      state.showEditor = true;
    };
    return { state, createDeck, addCard, editCard, deleteCard, changeSelectedDeck, openEditor };
  },
};
</script>
