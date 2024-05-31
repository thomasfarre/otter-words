// useGameLogic.js
import { ref, computed } from "vue";
import { useStore } from '../store/useStore';


export function useGameLogic() {
  const { state } = useStore();
  const timeLeft = ref(240);
  const correctGuess = ref([]);
  const incorrectGuess = ref([]);
  const scores = ref({});

  const sounds = ref([
    new Audio("/sounds/pole.wav"),
    new Audio("/sounds/fishing.wav"),
    new Audio("/sounds/fish.wav"),
  ]);

  const sortedScores = computed(() => {
    const scoresArray = Object.keys(scores.value).map((username) => ({
      username,
      score: scores.value[username],
    }));
    scoresArray.sort((a, b) => b.score - a.score);
    return scoresArray;
  });

  const progressBarWidth = computed(() => {
    const initialTime = 240;
    return `${(timeLeft.value / initialTime) * 100}%`;
  });

  const reversedCorrectGuess = computed(() => {
    return [...correctGuess.value].reverse();
  });

  const reversedIncorrectGuess = computed(() => {
    return [...incorrectGuess.value].reverse();
  });


  return {
    channelName: computed(() => state.channelName),
    accessToken: computed(() => state.accessToken),
    timeLeft,
    sortedScores,
    progressBarWidth,
    reversedCorrectGuess,
    reversedIncorrectGuess,
    correctGuess,
    incorrectGuess,
    scores,
    sounds,
  };
}
