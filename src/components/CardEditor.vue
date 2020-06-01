<template>
  <div class="card-editor">
    <p class="form__top-label">Front</p>
    <input v-model="newFrontText" class="form__text-input" type="text" />
    <p class="form__top-label">Back</p>
    <input v-model="newBackText" class="form__text-input" type="text" />
    <div class="form__btn-row">
      <font-awesome-icon
        class="form__btn btn form__btn--cancel"
        icon="times"
        size="2x"
        @click="$emit('cancelEdit')"
      ></font-awesome-icon>
      <font-awesome-icon
        class="form__btn btn form__btn--confirm"
        color="rgb(46, 204, 113)"
        icon="check"
        size="2x"
        @click="editCard()"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editPayload: {
      type: Object,
      default: function() {
        return {
          deckTitle: {
            type: String,
            default: '',
          },
          frontText: {
            type: String,
            default: '',
          },
          backText: {
            type: String,
            default: '',
          },
          _id: {
            type: String,
            default: '',
          },
        };
      },
    },
  },
  data() {
    return {
      newFrontText: '',
      newBackText: '',
    };
  },
  created() {
    this.setFields();
  },
  methods: {
    setFields: function() {
      this.newFrontText = JSON.parse(JSON.stringify(this.editPayload.frontText));
      this.newBackText = JSON.parse(JSON.stringify(this.editPayload.backText));
    },
    editCard: function() {
      const payload = {
        frontText: this.newFrontText,
        backText: this.newBackText,
        deckTitle: this.editPayload.deckTitle,
        _id: this.editPayload._id,
      };
      this.$emit('editCard', payload);
    },
  },
};
</script>

<style scoped>
.card-editor {
  background-color: white;
  box-shadow: 0px 0px 14px 1px #0000008c;
  position: fixed;
  top: 200px;
  left: calc(50% - 150px);
  min-width: 300px;
  max-width: 600px;
  text-align: center;
  border-radius: 10px;
  padding-top: 1rem;
}
</style>
