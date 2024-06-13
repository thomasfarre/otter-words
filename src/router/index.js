// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WordsGame from "../components/WordsGame.vue";
import HomePage from "../components/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/game",
    name: "WordsGame",
    component: WordsGame,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const auth = getAuth();


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      // If user tries to access a guarded route without being logged in, redirect to home to trigger login
      next("/");
    } else {
      next(); // Proceed normally for all routes
    }
  });
});

export default router;
