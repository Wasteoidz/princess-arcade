import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const num1 = ref<number>(3)
  const num2 = ref<number>(2)
  const score = ref<number>(0)
  const choices = ref<number[]>([4, 5, 6])
  const isCorrect = ref<boolean | null>(null)
  const lastChosen = ref<number | null>(null) // 🟢 Track her tapped answer

  function generateProblem() {
    isCorrect.value = null
    lastChosen.value = null

    num1.value = Math.floor(Math.random() * 5) + 1
    num2.value = Math.floor(Math.random() * 4) + 1

    const answer = num1.value + num2.value
    const wrong1 = answer + 1
    const wrong2 = answer - 1 <= 0 ? answer + 2 : answer - 1

    choices.value = [answer, wrong1, wrong2].sort(() => Math.random() - 0.5)
  }

  function checkAnswer(chosen: number) {
    lastChosen.value = chosen // 🟢 Save her chosen number immediately

    if (chosen === (num1.value + num2.value)) {
      score.value++
      isCorrect.value = true
      setTimeout(() => generateProblem(), 1500)
    }
    else {
      isCorrect.value = false
    }
  }

  return { num1, num2, score, choices, isCorrect, lastChosen, checkAnswer }
})
