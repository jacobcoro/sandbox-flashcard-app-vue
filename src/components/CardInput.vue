<template>
  <div class="card-input">
    <h2 class="card-input__title title">Create a Card</h2>
    <p class="form__top-label">Front</p>
    <input v-model="frontText" name="card-front-input" class="form__text-input" type="text" />
    <p class="form__top-label">Back</p>
    <input v-model="backText" name="card-back-input" class="form__text-input" type="text" />

    <div class="form__top-label">
      Add card to deck: <strong class="form__top-label--strong">{{ selectedDeck }}</strong>
    </div>
    <span v-show="decks.length > 1" class="tag-selection">
      <span class="tag-selection__title">Change deck:</span>
      <span v-for="deck in decks" :key="deck.title" class="tag-selection__tag-span">
        <button
          v-show="deck.title !== selectedDeck"
          class="tag-selection__tag"
          @click="$emit('changeSelectedDeck', deck.title)"
        >
          {{ deck.title }}
        </button>
      </span>
    </span>
    <div class="card-input__add-icon-wrapper">
      <font-awesome-icon
        class="card-input__add-icon button"
        color="rgb(46, 204, 113)"
        icon="plus-square"
        size="2x"
        @click="addCard()"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedDeck: {
      type: String,
      default: 'Default Deck',
    },
    decks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      frontText: '',
      backText: '',
    };
  },
  methods: {
    addCard: function() {
      const card = { frontText: this.frontText, backText: this.backText };
      this.$emit('addCard', card);
      this.frontText = '';
      this.backText = '';
    },
  },
};
</script>

<style scoped>
.card-input {
  margin: auto;
  text-align: center;
}
.tag-selection__tag {
  color: white;
  background: grey;
  border: none;
  border-radius: 7px;
  margin: 5px;
  padding: 0.35rem;
  cursor: pointer;
  font-weight: bold;
}
</style>
