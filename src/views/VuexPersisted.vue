<template>
  <div class="home">
    <section class="home__section editing-section">
      <deck-input class="editing-section__deck-input" @createDeck="createDeck"></deck-input>
      <card-input
        class="editing-section__card-input"
        :selected-deck="selectedDeck"
        :decks="decks"
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
        v-if="showEditor"
        class="display-section__card-editor"
        :edit-payload="editPayload"
        @cancelEdit="showEditor = false"
        @editCard="editCard"
      ></card-editor>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Deck, NewCardPayload, DeleteCardPayload, EditCardPayload } from '@/types';
import store from '../store';
import CardEditor from '@/components/CardEditor.vue';
import DeckInput from '@/components/DeckInput.vue';
import CardInput from '@/components/CardInput.vue';
import DeckDisplay from '@/components/DeckDisplay.vue';

export default Vue.extend({
  name: 'VuexPersisted',
  components: { CardInput, DeckDisplay, DeckInput, CardEditor },
  data() {
    return {
      // ts keeps complaining Property 'decks' does not exist on type 'CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<Record<never, any>>>'
      selectedDeck: this.decks ? (this.decks[0].title as string) : ('' as string),
      showEditor: false as boolean,
      editPayload: {} as EditCardPayload,
    };
  },
  computed: {
    decks(): Deck[] {
      return store.getters.decksMod.decks as Deck[];
    },
  },
  methods: {
    createDeck: function(deck: Deck) {
      store.commit.decksMod.addDeck(deck);
      this.selectedDeck = deck.title;
    },
    addCard: function(payload: NewCardPayload) {
      payload.deckTitle = this.selectedDeck;
      store.commit.decksMod.addCard(payload);
    },
    editCard: function(payload: EditCardPayload) {
      store.commit.decksMod.editCard(payload);
      this.showEditor = false;
    },
    deleteCard: function(payload: DeleteCardPayload) {
      store.commit.decksMod.deleteCard(payload);
    },
    changeSelectedDeck: function(title: string) {
      this.selectedDeck = title;
    },
    openEditor: function(payload: EditCardPayload) {
      this.editPayload = payload;
      this.showEditor = true;
    },
  },
});
</script>
