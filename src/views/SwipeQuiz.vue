<template>
  <div class="swipe-quiz">
    <div class="lesson-header">
      <div class="lesson-title">Lesson 3.1</div>
      <div class="lesson-progress">
        <div class="progress-dot active"></div>
        <div class="progress-dot active"></div>
        <div class="progress-dot active"></div>
        <div class="progress-dot"></div>
        <div class="progress-dot"></div>
      </div>
    </div>
    
    <div class="lesson-instruction">
      Tap the arrows below the cards to swipe the cards in the direction of the correct change.
    </div>
    
    <div class="categories-labels">
      <div class="category-label left">← Physical Change</div>
      <div class="category-label right">Chemical Change →</div>
    </div>
    
    <div class="card-container" ref="cardContainer">
      <transition name="card-animation">
        <div 
          v-if="!quizCompleted && currentCardIndex < cards.length" 
          class="card"
          :class="[currentCard.color, {
            'swiping-left': swipingLeft,
            'swiping-right': swipingRight,
            'swing-back': swingBack
          }]"
          ref="currentCard"
        >
          <div class="card-icon" v-html="currentCard.icon"></div>
          <div class="card-title">{{ currentCard.title }}</div>
        </div>
      </transition>
      
      <div v-if="quizCompleted" class="completion-message">
        <div class="success-message">Great Job</div>
        <button class="try-again-button" @click="resetQuiz">Try Again</button>
      </div>
    </div>
    
    <div class="swipe-buttons" v-if="!quizCompleted">
      <button 
        class="swipe-button left" 
        @click="handleSwipe('left')"
        :disabled="isAnimating"
      >
        ←
      </button>
      <button 
        class="swipe-button right" 
        @click="handleSwipe('right')"
        :disabled="isAnimating"
      >
        →
      </button>
    </div>
    
    <button 
      class="next-button"
      :disabled="!quizCompleted"
      @click="goToHome"
    >
      Next →
    </button>
  </div>
</template>

<script>
export default {
  name: 'SwipeQuiz',
  data() {
    return {
      cards: [
        {
          title: 'Burning Paper',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M11.43,10.94C11.2,11.68 10.87,12.47 10.42,13.34C10.22,13.72 10,14.08 9.92,14.38L10.03,14.34V14.34C11.3,13.9 12.5,13.5 13.58,13.14C13.16,12.87 12.7,12.57 12.22,12.26C11.72,11.95 11.2,11.61 10.76,11.3C11.04,11.5 11.28,11.73 11.43,10.94M17.91,14.58C17.62,14.91 16.86,15.41 15.91,16L15.31,16.27C14.66,16.54 13.9,16.84 13.03,17.18C11.33,17.81 9.31,18.6 7.44,19.57L7.17,19.74L7.17,19.74C6.44,20.18 6.24,20.68 6.2,20.87C6.14,21.1 6.33,21.46 6.68,21.63C6.94,21.76 7.31,21.83 7.71,21.83C8.1,21.83 8.5,21.79 8.91,21.7C13.04,20.77 14.88,19.76 15.94,19.12C16.16,19 16.32,18.88 16.36,18.76C16.43,18.5 16.03,18.1 15.36,18.12C15.57,18.04 15.77,17.97 15.93,17.9L15.98,17.88L15.98,17.88C16.29,17.74 16.5,17.65 16.71,17.53C17.13,17.3 17.44,17 17.69,16.72C17.77,16.6 17.85,16.5 17.91,16.4C17.96,16.26 18,16.13 18,16C18,15.43 17.96,15.05 17.91,14.58M18.43,10.19C18.43,10.19 16.97,11.9 16.06,12.96C15.06,14.12 13.63,15.08 12.71,15.08C12.57,15.08 12.39,15.03 12.16,14.91C11.91,14.78 11.61,14.55 11.59,14.23C11.58,14.08 11.64,13.95 11.76,13.83C12.26,13.36 12.94,12.89 13.41,12.5C13.96,12.04 14.56,11.57 14.93,11.07C14.65,10.69 14.26,10.46 13.61,10.12L13.61,10.12V10.12C13.23,9.91 12.97,9.77 12.65,9.14C12.46,8.81 12.31,8.33 12.23,7.76C12.16,7.2 12.15,6.58 12.36,6.04C12.2,5.86 12.12,5.47 12.12,5.06C12.12,4.57 12.23,4.07 12.42,3.6C12.36,3.55 12.3,3.5 12.24,3.43C12,3.16 11.96,2.78 12.13,2.45C12.29,2.12 12.63,1.89 13,1.89C13.27,1.89 13.5,1.97 13.67,2.21L13.67,2.21V2.21C13.7,2.25 13.76,2.32 13.79,2.42C13.86,2.57 13.89,2.76 13.88,2.96C13.89,3.57 13.64,4.24 13.3,4.8C13.3,4.8 13.23,4.94 13.1,5.15C13.25,5.54 13.37,6 13.37,6.47C13.37,7.05 13.21,7.63 12.97,8.2C12.71,8.79 12.33,9.38 12.06,9.85C12.24,10.05 12.45,10.21 12.6,10.31L12.8,10.41C13.25,10.66 13.6,10.8 13.8,11.16C14.68,10.63 15.12,10.18 16.37,8.81C17.92,7.12 18.43,5.23 18.43,5.23C18.43,5.23 18.65,5.95 18.43,10.19Z"></path></svg>',
          correctSwipe: 'right',
          color: 'teal'
        },
        {
          title: 'Melting Ice',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M4,2H20V4H4V2M4,6H15V8H4V6M4,10H13V12H4V10M14,14.42C13.74,14.78 13.57,15.19 13.5,15.61C13.5,15.61 12.88,15.57 12.4,15.97C11.75,16.5 11.6,17.13 11.75,17.13C11.75,17.13 11.13,17.97 11.85,18.67C12.22,19.03 12.59,19.13 13.06,19.13C12.77,19.7 12.31,20.75 12.31,20.75C12.31,20.75 12.35,21.78 13.25,21.78C14,21.78 14.33,21.32 14.77,20.66C15.17,20.12 16,19.08 16.45,18.83C16.97,18.53 17.5,17.5 17.1,16.31C16.26,15.88 15.87,15.76 15.05,15.31C15.11,14.92 15.26,14.5 15.46,14.1C16.78,15.1 18,15.82 18,13.72C18,12.72 16.86,12 16.86,12C16.86,12 16.33,12.18 15.8,12.68C15.08,13.34 14.45,14.21 14,14.42M22,20L19.84,16.47L22,13.24V20Z"></path></svg>',
          correctSwipe: 'left',
          color: 'blue'
        },
        {
          title: 'Rusting Iron',
          icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="white" d="M23,11H20V9H18V11H15V6H7V11H4V13H7V18H15V13H18V15H20V13H23M13,16H9V8H13V16Z"></path></svg>',
          correctSwipe: 'right',
          color: 'orange'
        }
      ],
      currentCardIndex: 0,
      swipingLeft: false,
      swipingRight: false,
      swingBack: false,
      quizCompleted: false,
      isAnimating: false
    };
  },
  computed: {
    currentCard() {
      return this.cards[this.currentCardIndex] || {};
    }
  },
  mounted() {
    // Initialize Hammer.js for touch gestures if available
    if (typeof Hammer !== 'undefined') {
      const hammertime = new Hammer(this.$refs.cardContainer);
      hammertime.on('swipeleft', () => this.handleSwipe('left'));
      hammertime.on('swiperight', () => this.handleSwipe('right'));
    }
  },
  methods: {
    handleSwipe(direction) {
      if (this.isAnimating) return;
      
      this.isAnimating = true;
      
      // Set the swiping direction
      if (direction === 'left') {
        this.swipingLeft = true;
        this.swipingRight = false;
      } else {
        this.swipingLeft = false;
        this.swipingRight = true;
      }
      
      // Check if swipe is correct
      const isCorrect = direction === this.currentCard.correctSwipe;
      
      if (isCorrect) {
        // If correct, allow card to swipe away
        setTimeout(() => {
          this.swipingLeft = false;
          this.swipingRight = false;
          this.currentCardIndex++;
          this.isAnimating = false;
          
          // Check if all cards are done
          if (this.currentCardIndex >= this.cards.length) {
            this.quizCompleted = true;
          }
        }, 300);
      } else {
        // If incorrect, swing back
        setTimeout(() => {
          this.swipingLeft = false;
          this.swipingRight = false;
          this.swingBack = true;
          
          setTimeout(() => {
            this.swingBack = false;
            this.isAnimating = false;
          }, 500);
        }, 300);
      }
    },
    resetQuiz() {
      this.currentCardIndex = 0;
      this.quizCompleted = false;
      this.swipingLeft = false;
      this.swipingRight = false;
      this.swingBack = false;
    },
    goToHome() {
      // Navigate to tap-to-reveal or another screen
      this.$router.push('/tap-to-reveal');
    }
  }
};
</script>

<style scoped>
.categories-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.category-label {
  font-size: 0.9rem;
  color: #666;
}

.card-container {
  height: 280px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.card {
  width: 200px;
  height: 250px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-icon {
  margin-bottom: 15px;
}

.card-title {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
}

.swipe-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 20px;
}

.swipe-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: none;
  color: #666;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.swipe-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.swipe-button.left {
  background-color: #bbdefb;
}

.swipe-button.right {
  background-color: #ffcdd2;
}

.swiping-left {
  transform: translateX(-300px) rotate(-30deg);
  opacity: 0;
}

.swiping-right {
  transform: translateX(300px) rotate(30deg);
  opacity: 0;
}

.swing-back {
  animation: swingBack 0.5s ease;
}

@keyframes swingBack {
  0% {
    transform: translateX(50px) rotate(15deg);
  }
  50% {
    transform: translateX(-20px) rotate(-10deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}

.completion-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.success-message {
  font-size: 2rem;
  color: var(--success-color);
  font-weight: bold;
  margin-bottom: 20px;
}

.try-again-button {
  padding: 10px 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
}

.card-animation-leave-active {
  transition: all 0.3s;
}

.card-animation-leave-to {
  opacity: 0;
}

.card-animation-enter-active {
  transition: opacity 0.3s;
}

.card-animation-enter-from {
  opacity: 0;
}
</style> 