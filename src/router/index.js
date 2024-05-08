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
    path: "/game/:userId",
    name: "WordsGame",
    component: WordsGame,
    meta: { requiresAuth: true },
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
    } else if (requiresAuth && user) {
      // Verify the user ID in the route matches the logged-in user's ID
      if (to.params.userId !== user.uid) {
        next(false); // Stop the navigation if the IDs do not match
      } else {
        next(); // Proceed if the IDs match
      }
    } else {
      next(); // Proceed normally for non-guarded routes
    }
  });
});

export default router;
