import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // 🟢 State Variables (Refs)
  const currentMode = ref<string>('easy-addition') // Default mode
  const operator = ref<string>('➕') // Holds the current math symbol
  const num1 = ref<number>(3)
  const num2 = ref<number>(2)
  const score = ref<number>(0)
  const choices = ref<number[]>([4, 5, 6])
  const isCorrect = ref<boolean | null>(null)
  const lastChosen = ref<number | null>(null)

  // 🟢 Main Problem Generator
  function generateProblem() {
    isCorrect.value = null
    lastChosen.value = null

    // 💡 FIXED: Use variable.value instead of 'this.'
    if (currentMode.value === 'easy-addition') {
      num1.value = Math.floor(Math.random() * 5) + 1 // 1 to 5
      num2.value = Math.floor(Math.random() * 5) + 1 // 1 to 5
      operator.value = '➕'
    }
    else if (currentMode.value === 'hard-addition') {
      num1.value = Math.floor(Math.random() * 10) + 1 // 1 to 10
      num2.value = Math.floor(Math.random() * 10) + 1 // 1 to 10
      operator.value = '➕'
    }
    else if (currentMode.value === 'multiplication') {
      num1.value = Math.floor(Math.random() * 5) + 1 // 1 to 5
      num2.value = Math.floor(Math.random() * 3) + 1 // 1 to 3
      operator.value = '✖️'
    }

    // Calculate the true answer based on the current active mode
    let answer = num1.value + num2.value
    if (currentMode.value === 'multiplication') {
      answer = num1.value * num2.value
    }

    // Generate smart wrong answers
    const wrong1 = answer + 1
    const wrong2 = answer - 1 <= 0 ? answer + 2 : answer - 1

    choices.value = [answer, wrong1, wrong2].sort(() => Math.random() - 0.5)
  }

  // 🟢 Answer Checker Logic
  function checkAnswer(chosen: number) {
    lastChosen.value = chosen

    // Calculate the target answer to compare against
    let correctTarget = num1.value + num2.value
    if (currentMode.value === 'multiplication') {
      correctTarget = num1.value * num2.value
    }

    if (chosen === correctTarget) {
      score.value++
      isCorrect.value = true
      setTimeout(() => generateProblem(), 1500)
    }
    else {
      isCorrect.value = false
    }
  }

  // 🟢 Expose EVERYTHING to your views so components can access them
  return {
    currentMode,
    operator,
    num1,
    num2,
    score,
    choices,
    isCorrect,
    lastChosen,
    generateProblem,
    checkAnswer,
  }
})
