import { describe, it, expect } from "vitest";
import { useGameLogic } from "../src/components/useGameLogic";


describe("useGameLogic", () => {

  it("should initialize correctly", () => {
    const {
      timeLeft,
      correctGuess,
      incorrectGuess,
      scores,
      sounds,
    } = useGameLogic();

    expect(timeLeft.value).toBe(180);
    expect(correctGuess.value).toEqual([]);
    expect(incorrectGuess.value).toEqual([]);
    expect(scores.value).toEqual({});
    expect(sounds.value.length).toBe(3);
  });

  it("should compute sortedScores correctly", () => {
    const { scores, sortedScores } = useGameLogic();

    scores.value = {
      user1: 10,
      user2: 20,
      user3: 15,
    };

    expect(sortedScores.value).toEqual([
      { username: "user2", score: 20 },
      { username: "user3", score: 15 },
      { username: "user1", score: 10 },
    ]);
  });

  it("should compute progressBarWidth correctly", () => {
    const { timeLeft, progressBarWidth } = useGameLogic();

    timeLeft.value = 90;
    expect(progressBarWidth.value).toBe("50%");

    timeLeft.value = 0;
    expect(progressBarWidth.value).toBe("0%");
  });

  it("should compute reversedCorrectGuess and reversedIncorrectGuess correctly", () => {
    const {
      correctGuess,
      incorrectGuess,
      reversedCorrectGuess,
      reversedIncorrectGuess,
    } = useGameLogic();

    correctGuess.value = ["guess1", "guess2", "guess3"];
    incorrectGuess.value = ["wrong1", "wrong2"];

    expect(reversedCorrectGuess.value).toEqual(["guess3", "guess2", "guess1"]);
    expect(reversedIncorrectGuess.value).toEqual(["wrong2", "wrong1"]);
  });
});
