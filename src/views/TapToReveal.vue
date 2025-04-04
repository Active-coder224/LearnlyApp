<template>
  <div class="tap-to-reveal">
    <div class="lesson-header">
      <div class="lesson-title">Lesson 2.1</div>
      <div class="lesson-progress">
        <div class="progress-dot active"></div>
        <div class="progress-dot active"></div>
        <div class="progress-dot"></div>
        <div class="progress-dot"></div>
        <div class="progress-dot"></div>
      </div>
    </div>
    
    <div class="lesson-instruction">Tap to Discover States of Matter!</div>
    
    <div class="cards-container">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="card"
        :class="{ flipped: card.flipped, [card.color]: true }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front">
            <div class="card-icon" v-html="card.icon"></div>
            <div class="card-title">{{ card.title }}</div>
          </div>
          <div class="card-back">
            <div class="card-label">{{ card.state }}</div>
            <div class="card-description">{{ card.description }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <button 
      class="next-button"
      @click="moveToSwipeQuiz"
      :disabled="!allCardsFlipped"
    >
      Next →
    </button>
  </div>
</template>

<script>
export default {
  name: 'TapToReveal',
  data() {
    return {
      cards: [
        {
          title: 'Steam',
          state: 'Gas',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M12,3.6C11.5,4.1 11.2,4.8 11,5.6C11.5,5.2 12.2,5 13,5C14.1,5 15.1,5.4 15.8,6.2C16,5.4 15.9,4.4 15.3,3.7C16.2,3.1 16.9,2.3 17.3,1.5C15.9,2.1 14.3,2 13,1.4C11.6,2.1 10.5,3.1 10.7,4.5C11.3,4 11.9,3.7 12.5,3.5M13,6A3,3 0 0,0 10,9C10,10.7 11.3,12 13,12C14.7,12 16,10.7 16,9C16,7.3 14.7,6 13,6M0,17.9V19.5C0,20.9 1.1,22 2.5,22H8.5C7.3,21.1 6.2,19.8 6,18H3C1.9,18 1,17.1 1,16V12C1,10.9 1.9,10 3,10H4C4,7.2 6.2,5 9,5C9.5,5 10,5.1 10.5,5.2C10.2,5.7 10,6.3 10,7C7.2,7 5,9.2 5,12H9.5C9.8,12.4 10.2,12.7 10.7,12.9C10.3,13.3 9.8,13.5 9.5,13.5C9.3,13.5 4.6,14 4.1,14.5C4,14.6 4,14.8 4,15C7.6,15 9,15 9,15C8.5,15.5 7.8,16.4 8,18C8.1,19 9,20.4 10.5,21.5C11.3,22.1 12.3,22.5 13.1,22.8C15.1,23.3 17.2,23.4 19.3,22.7V21.8C19.3,21.6 19.2,21.5 19.1,21.4L18.6,21.1C15.2,17.7 16.4,14.3 16.7,13.5C12.4,13.5 12,13.1 12,12.5C12,11.9 12.5,11.5 13.7,11.5C14.8,11.5 17.1,14 21,14C21.1,13.4 21.2,12.7 21.1,12C18.3,10.1 16,10 14,10.6C14,10.4 14,10.2 14,10C14,8.3 15.3,7 17,7C18.7,7 20,8.3 20,10C20,10.6 19.8,11.1 19.5,11.5C21.6,12.1 23,12.8 23,14.5C23,16.1 21.5,16.4 21.5,16.4C20.4,16.6 19.7,16.5 19.2,16.5C18.2,16.5 17.3,16.1 16.5,15.7C16,16.7 16,18.3 17,20L17.5,20.2C18.7,20.9 20,21.4 21.2,21.7C21.7,21.9 22.3,21.9 22.7,21.9C22.9,21.9 23,21.9 23,21.9L24,21.9V18C24,17.3 23.1,16.6 22,16.2V15C22,13.2 19.1,11.6 16.7,10.6C16.8,10.4 16.9,10.2 17,10C17,8.9 16.4,7.9 15.5,7.4C15.7,7.6 15.8,7.8 15.9,8.1C16,8.3 16,8.7 16,9C16,9.9 15.5,10.7 14.7,11.1C14.5,11.2 14.2,11.3 14,11.3C13.2,11.2 12.9,11 12.8,10.8C12.6,10.5 12.7,10.3 12.8,10.1C13.2,9.6 13.7,9.3 14.2,9C14.4,8.8 14.5,8.7 14.8,8.3C14.9,8.1 15,7.9 15,7.7C15,7.6 15,7.4 14.9,7.3C14.8,7.2 14.6,7 14.3,7C14.1,7 13.9,7.1 13.7,7.2C13.5,7.4 13.3,7.6 13.2,7.8C13.2,8 13.1,8.2 13.1,8.4V8.5C13.1,8.7 13.1,9 13.3,9.3C12.6,9.8 11.9,10.7 11.8,11.4C11.8,11.7 11.9,11.9 12,12.1C12.5,13 13.6,13.1 14,13C15,12.8 15.7,12.3 16.1,11.3C16.3,11.5 16.4,11.7 16.6,11.9C16.8,12.1 17.1,12.3 17.5,12.5C17.8,12.6 18.3,12.7 18.9,12.9C17.9,12.5 15.8,11.3 15.3,10C15.5,9.8 15.7,9.6 15.8,9.3C16.2,8.5 16.6,7.8 16.9,7C16.2,6.4 15.1,6 14,6.2C14,6.1 14,6.1 14,6C14.5,5.7 15.4,6 16.3,6.6C17.6,3.5 15.5,3.8 14.7,3.8C15.6,3.3 16.5,3.8 16.7,4.1C14.5,2.1 13.1,3.1 13,3.6M6,18C6,18.5 6.1,19 6.3,19.6C7,19.1 7.8,19 9.5,19C12.3,19 14,20.6 14,22H17.5C17.5,21.2 16.7,20.4 15.9,19.9C15.5,19.7 15,19.5 14.6,19.4C13.5,19.1 12.3,19 11.1,19.1C10.5,19.1 9.2,19.5 8.5,19.3C8.2,19.2 6.6,18.7 6,18Z"></path></svg>',
          description: 'A gas expands to fill any container. Its particles move freely and spread apart.',
          color: 'teal',
          flipped: false
        },
        {
          title: 'Water',
          state: 'Liquid',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z"></path></svg>',
          description: 'A liquid takes the shape of its container but keeps its volume. Its particles are close together.',
          color: 'purple',
          flipped: false
        },
        {
          title: 'Ice',
          state: 'Solid',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M5 11H19L14.83 6.83L16.24 5.41L23.17 12.34L16.24 19.26L14.83 17.85L19 13.69H5V16.69L1 12.69L5 8.69V11Z"></path></svg>',
          description: 'Fixed shape & volume. Its particles vibrate but don\'t move freely.',
          color: 'orange',
          flipped: false
        },
        {
          title: 'Lightning',
          state: 'Plasma',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M11 15H6L13 1V9H18L11 23V15Z"></path></svg>',
          description: 'A highly energized state of matter with charged particles. Similar to gas but electrically conductive.',
          color: 'blue',
          flipped: false
        }
      ]
    };
  },
  computed: {
    allCardsFlipped() {
      return this.cards.every(card => card.flipped);
    }
  },
  methods: {
    flipCard(index) {
      this.cards[index].flipped = !this.cards[index].flipped;
    },
    moveToSwipeQuiz() {
      this.$router.push('/swipe-quiz');
    }
  }
};
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  margin-bottom: 20px;
}

.card {
  height: 180px;
  border-radius: 15px;
  perspective: 1000px;
  cursor: pointer;
  overflow: hidden;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card-back {
  transform: rotateY(180deg);
  background-color: white;
  color: #333;
}

.card-icon {
  margin-bottom: 10px;
}

.card-title {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.card-label {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
}

.card-description {
  font-size: 0.9rem;
  text-align: center;
  color: #666;
}

.teal {
  background-color: var(--teal-card);
}

.purple {
  background-color: var(--purple-card);
}

.orange {
  background-color: var(--orange-card);
}

.blue {
  background-color: var(--blue-card);
}
</style> 