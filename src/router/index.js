import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WordsGame from "../components/WordsGame.vue";
import HomePage from "../components/HomePage.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/game",
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
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Using Firebase to check user authentication state
    onAuthStateChanged(auth, (user) => {
      if (!user && to.path !== "/login") {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next(); // If authenticated, or going to login, proceed
      }
    });
  } else {
    next(); // If no authentication needed, proceed
  }
});

export default router;
