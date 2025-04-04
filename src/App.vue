<template>
  <div class="app">
    <nav class="navigation" role="navigation" aria-label="Main Navigation">
      <router-link to="/tap-to-reveal" class="nav-link"
        >Tap To Reveal</router-link
      >
      |
      <router-link to="/swipe-quiz" class="nav-link">Swipe Quiz</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  /* Color palette */
  --primary-color: #1a237e;
  --secondary-color: #4a148c;
  --blue-card: #42a5f5;
  --teal-card: #26c6da;
  --orange-card: #ffb74d;
  --purple-card: #ba68c8;
  --success-color: #4caf50;

  /* Spacing */
  --spacing-sm: 5px;
  --spacing-md: 10px;
  --spacing-lg: 20px;
  --spacing-xl: 30px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  line-height: 1.6;
}

.app {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background-color: white;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.navigation {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md) 0;
  text-align: center;
}

.nav-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
  padding: var(--spacing-sm) var(--spacing-md);
  transition: color 0.3s, border-color 0.3s;
}

.nav-link:hover,
.nav-link:focus {
  color: var(--secondary-color);
  outline: none;
  text-decoration: underline;
}

.nav-link.router-link-active {
  color: var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
}

.lesson-header {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-xl);
}

.lesson-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
}

.lesson-progress {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.progress-dot {
  width: 30px;
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.progress-dot.active {
  background-color: var(--primary-color);
}

.lesson-instruction {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.next-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: var(--spacing-xl);
  text-align: center;
  transition: background-color 0.3s;
  transform: translateZ(0); /* Hardware acceleration */
}

.next-button:hover:not(:disabled) {
  background-color: var(--secondary-color);
}

.next-button:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.next-button:disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .app {
    padding: var(--spacing-md);
  }
}

@media (min-width: 768px) {
  .app {
    border-radius: 8px;
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    min-height: calc(100vh - 2 * var(--spacing-lg));
  }
}
</style>
