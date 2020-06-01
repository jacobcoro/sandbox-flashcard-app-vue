<template>
  <div class="flashcard">
    <div
      v-show="!isToggle"
      :style="{ backgroundColor: colorFront, color: colorTextFront }"
      class="flashcard__wrapper a-flipInX flashcard__front"
      @click="isToggle = !isToggle"
    >
      <div class="flashcard__header" style="padding-bottom: 15px;">{{ headerFront }}</div>
      <div class="flashcard__content">
        <p class="flashcard__text" :style="{ fontSize: textSizeFront, fontWeight: 'bold' }">
          {{ front }}
        </p>
        <img
          v-if="imgFront != ''"
          class="flashcard__img"
          :src="imgFront"
          width="200"
          height="200"
        />
      </div>
      <div class="flashcard__footer">{{ footerFront }}</div>
    </div>
    <div
      v-show="isToggle"
      :style="{ backgroundColor: colorBack, color: colorTextBack }"
      class=" flashcard__wrapper a-flipInX flashcard__back"
      @click="isToggle = !isToggle"
    >
      <div class="flashcard__header" style="padding-bottom: 15px;">{{ headerBack }}</div>
      <div class="flashcard__content">
        <p class="flashcard__text" :style="{ fontSize: textSizeBack, fontWeight: 'bold' }">
          {{ back }}
        </p>
        <img v-if="imgBack != ''" class="flashcard__img" :src="imgBack" width="200" height="200" />
      </div>
      <div class="flashcard__footer">{{ footerBack }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgFront: {
      type: String,
      default: '',
    },
    imgBack: {
      type: String,
      default: '',
    },
    front: {
      type: String,
      default: '',
    },
    back: {
      type: String,
      default: '',
    },
    textSizeFront: {
      type: String,
      default: '2em',
    },
    textSizeBack: {
      type: String,
      default: '2em',
    },
    colorTextFront: {
      type: String,
      default: 'black',
    },
    colorTextBack: {
      type: String,
      default: 'white',
    },
    colorFront: {
      type: String,
      default: 'white',
    },
    colorBack: {
      type: String,
      default: '#2ecc71',
    },
    headerFront: {
      type: String,
      default: 'Question',
    },
    headerBack: {
      type: String,
      default: 'Answer',
    },
    footerFront: {
      type: String,
      default: 'Click to flip',
    },
    footerBack: {
      type: String,
      default: 'Click to flip',
    },
  },
  data() {
    return {
      isToggle: false,
    };
  },
};
</script>
<style scoped>
.flashcard {
  width: 100%;
}

.flashcard__wrapper {
  line-height: 1.5;
  cursor: pointer;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4);
  text-align: center;

  animation-duration: 1s;
  animation-fill-mode: both;
}

.flashcard__wrapper:hover {
  box-shadow: 0 0px 25px rgba(0, 0, 0, 0.8);
}

.a-flipInX {
  backface-visibility: visible !important;
  animation-name: flipInX;
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}
</style>
