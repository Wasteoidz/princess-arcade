import { defineStore } from 'pinia'
import { ref } from 'vue'

interface WordItem {
  word: string // The exact Norwegian answer (e.g., "SOL")
  emoji: string // The visual cue (e.g., "☀️")
}

export const useSpellingGameStore = defineStore('spellingGame', () => {
  // 1. Core Word Database
  const wordBank: WordItem[] = [
    { word: 'SOL', emoji: '☀️' },
    { word: 'BIL', emoji: '🚗' },
    { word: 'BÅT', emoji: '⛵' },
    { word: 'SAU', emoji: '🐑' },
    { word: 'REV', emoji: '🦊' },
    { word: 'FLY', emoji: '✈️' },
    { word: 'HUS', emoji: '🏠' },
    { word: 'BOK', emoji: '📖' },
  ]

  // 2. Active Game State
  const currentWordItem = ref<WordItem | null>(null)
  const scrambledLetters = ref<string[]>([]) // The mixed up buttons she can press (e.g., ['O', 'L', 'S'])
  const userSpelling = ref<string[]>([]) // Letters she has chosen so far (e.g., ['S'])
  const isCorrect = ref<boolean | null>(null)
  const score = ref(0)

  // 3. Game Actions
  function generateNewWord() {
    isCorrect.value = null
    userSpelling.value = []

    // Grab a random word from the bank
    const randomIndex = Math.floor(Math.random() * wordBank.length)
    const selected = wordBank[randomIndex]

    // 🛡️ A quick safety guard to make TypeScript happy
    if (!selected) return

    currentWordItem.value = selected

    // Split "SOL" into ['S', 'O', 'L'] and shuffle them randomly
    scrambledLetters.value = selected.word.split('').sort(() => Math.random() - 0.5)
  }

  function selectLetter(letter: string, index: number) {
    if (!currentWordItem.value || isCorrect.value === true) return

    // Add letter to her spelling tray
    userSpelling.value.push(letter)

    // Remove it from the available scrambled choices so she can't click it twice
    scrambledLetters.value.splice(index, 1)

    // Check if she filled all the slots
    if (userSpelling.value.length === currentWordItem.value.word.length) {
      const fullAttempt = userSpelling.value.join('')

      if (fullAttempt === currentWordItem.value.word) {
        isCorrect.value = true
        score.value += 10
      }
      else {
        isCorrect.value = false
        // Trigger a reset button or auto-reset after a delay so she can try again!
      }
    }
  }

  function resetCurrentWord() {
    // If she makes a mistake, put the letters back so she can retry
    if (currentWordItem.value) {
      userSpelling.value = []
      isCorrect.value = null
      scrambledLetters.value = currentWordItem.value.word.split('').sort(() => Math.random() - 0.5)
    }
  }

  return {
    currentWordItem,
    scrambledLetters,
    userSpelling,
    isCorrect,
    score,
    generateNewWord,
    selectLetter,
    resetCurrentWord,
  }
})
