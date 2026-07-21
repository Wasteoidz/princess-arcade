import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface WordItem {
  word: string
  emoji: string
}

export const useSpellingGameStore = defineStore('spellingGame', () => {
  const words3Letter: WordItem[] = [
    { word: 'SOL', emoji: '☀️' },
    { word: 'BIL', emoji: '🚗' },
    { word: 'BÅT', emoji: '⛵' },
    { word: 'SAU', emoji: '🐑' },
    { word: 'REV', emoji: '🦊' },
    { word: 'FLY', emoji: '✈️' },
    { word: 'HUS', emoji: '🏠' },
    { word: 'BOK', emoji: '📖' },
    { word: 'TOG', emoji: '🚂' },
    { word: 'AND', emoji: '🦆' },
    { word: 'EGG', emoji: '🥚' },
    { word: 'TRE', emoji: '🌲' },
    { word: 'HAV', emoji: '🌊' },
  ]

  const words4Letter: WordItem[] = [
    { word: 'KATT', emoji: '🐱' },
    { word: 'HUND', emoji: '🐶' },
    { word: 'HEST', emoji: '🐴' },
    { word: 'GRIS', emoji: '🐷' },
    { word: 'LØVE', emoji: '🦁' },
    { word: 'MAUR', emoji: '🐜' },
    { word: 'MÅNE', emoji: '🌙' },
    { word: 'BOKS', emoji: '📦' },
    { word: 'FISK', emoji: '🐟' },
    { word: 'GULV', emoji: '🪵' },
    { word: 'KAKE', emoji: '🎂' },
    { word: 'SÅPE', emoji: '🧼' },
    { word: 'SENG', emoji: '🛏️' },
    { word: 'BÆSJ', emoji: '💩' },
    { word: 'SAKS', emoji: '✂️' },

  ]

  const words5Letter: WordItem[] = [
    { word: 'BLÅSE', emoji: '💨' },
    { word: 'SKOLE', emoji: '🏫' },
    { word: 'KUBBE', emoji: '🪵' },
    { word: 'PRINS', emoji: '🤴' },
    { word: 'KANIN', emoji: '🐇' },
    { word: 'BANAN', emoji: '🍌' },
    { word: 'ROBOT', emoji: '🤖' },
    { word: 'SLOTT', emoji: '🏰' },
    { word: 'KRONE', emoji: '👑' },
    { word: 'FJELL', emoji: '⛰️' },
  ]

  const currentMode = ref<3 | 4 | 5>(3)
  const currentWordItem = ref<WordItem | null>(null)
  const scrambledLetters = ref<string[]>([])
  const userSpelling = ref<string[]>([])
  const isCorrect = ref<boolean | null>(null)
  const score = ref(0)

  const usedIndices3 = ref<number[]>([])
  const usedIndices4 = ref<number[]>([])
  const usedIndices5 = ref<number[]>([])

  const activeWordBank = computed(() => {
    return currentMode.value === 5 ? words5Letter : currentMode.value === 4 ? words4Letter : words3Letter
  })

  function setMode(mode: 3 | 4 | 5) {
    if (currentMode.value !== mode) {
      currentMode.value = mode
      generateNewWord()
    }
  }

  function generateNewWord() {
    isCorrect.value = null
    userSpelling.value = []

    const bank = activeWordBank.value
    const usedIndices = currentMode.value === 5 ? usedIndices5 : currentMode.value === 4 ? usedIndices4 : usedIndices3

    if (usedIndices.value.length >= bank.length) {
      usedIndices.value = []
    }

    let randomIndex: number
    do {
      randomIndex = Math.floor(Math.random() * bank.length)
    } while (usedIndices.value.includes(randomIndex))

    usedIndices.value.push(randomIndex)

    const selected = bank[randomIndex]
    if (!selected) return

    currentWordItem.value = selected

    scrambledLetters.value = selected.word.split('').sort(() => Math.random() - 0.5)
  }

  function selectLetter(letter: string, index: number) {
    if (!currentWordItem.value || isCorrect.value === true) return

    userSpelling.value.push(letter)
    scrambledLetters.value.splice(index, 1)

    if (userSpelling.value.length === currentWordItem.value.word.length) {
      const fullAttempt = userSpelling.value.join('')

      if (fullAttempt === currentWordItem.value.word) {
        isCorrect.value = true
        // Dynamic points based on mode:
        // Mode 3 (Lvl 1) = 1 point
        // Mode 4 (Lvl 2) = 2 points
        // Mode 5 (Lvl 3) = 3 points
        score.value += (currentMode.value - 2)
      }
      else {
        isCorrect.value = false
      }
    }
  }

  function resetCurrentWord() {
    if (currentWordItem.value) {
      userSpelling.value = []
      isCorrect.value = null
      scrambledLetters.value = currentWordItem.value.word.split('').sort(() => Math.random() - 0.5)
    }
  }

  return {
    currentMode,
    currentWordItem,
    scrambledLetters,
    userSpelling,
    isCorrect,
    score,
    setMode,
    generateNewWord,
    selectLetter,
    resetCurrentWord,
  }
})
