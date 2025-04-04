import { createRouter, createWebHistory } from "vue-router";
import TapToReveal from "../views/TapToReveal.vue";
import SwipeQuiz from "../views/SwipeQuiz.vue";

const routes = [
  {
    path: "/",
    redirect: "/tap-to-reveal",
  },
  {
    path: "/tap-to-reveal",
    name: "TapToReveal",
    component: TapToReveal,
  },
  {
    path: "/swipe-quiz",
    name: "SwipeQuiz",
    component: SwipeQuiz,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
