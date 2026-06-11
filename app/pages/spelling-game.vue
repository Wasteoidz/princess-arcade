<script setup>
import { watch } from 'vue'
import confetti from 'canvas-confetti'

const game = useSpellingGameStore()

// Kickstart her very first word automatically when the page loads
game.generateNewWord()

// 🎆 Keep those signature fireworks going for a flawless match!
watch(() => game.isCorrect, (newVal) => {
  if (newVal === true) {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#c084fc', '#60a5fa', '#fbbf24'],
    })
  }
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-between min-h-screen p-4 sm:p-8 bg-gradient-to-b text-slate-800 select-none transition-all duration-300"
    :class="{
      'from-purple-50 to-pink-100': game.isCorrect === null,
      'from-emerald-100 to-teal-200': game.isCorrect === true,
      'from-rose-100 to-orange-100': game.isCorrect === false,
    }"
  >
    <!-- Top Action Navigation Bar -->
    <div class="w-full max-w-md md:max-w-2xl flex justify-between items-center text-lg md:text-2xl font-bold border-b-2 border-pink-200/60 pb-4">
      <NuxtLink
        to="/"
        class="text-pink-500 hover:text-pink-600 text-xs md:text-sm font-bold bg-white px-3 py-1.5 md:px-5 md:py-2 rounded-2xl shadow-sm border border-pink-200 active:scale-95 transition-transform"
      >
        ◀ Menu
      </NuxtLink>

      <span class="font-black text-purple-600 tracking-wide text-base md:text-2xl"> Bokstavmagi </span>

      <span
        class="text-amber-500 bg-white px-3 py-1 md:px-5 md:py-1.5 rounded-2xl shadow-sm border border-amber-100 transition-all duration-300"
        :class="{ 'animate-score-pop': game.isCorrect === true }"
      >
        👑 {{ game.score }}
      </span>
    </div>

    <!-- Main Game Centerpiece Layout -->
    <div class="w-full max-w-md md:max-w-2xl flex flex-col items-center my-auto gap-6 md:gap-10">
      <!-- Big Visual Clue Emoji -->
      <div class="text-7xl md:text-9xl drop-shadow-md h-24 md:h-36 flex items-center justify-center transition-all duration-300">
        <div
          v-if="game.isCorrect === true"
          class="animate-princess-celebrate"
        >
          💖{{ game.currentWordItem?.emoji }}💖
        </div>
        <div
          v-else-if="game.isCorrect === false"
          class="animate-unicorn-sad flex items-center justify-center gap-1"
        >
          <!-- Reduced the sad emoji size slightly -->
          <span class="text-5xl md:text-7xl">🥺</span>
          <span>{{ game.currentWordItem?.emoji }}</span>
        </div>
        <div
          v-else
          class="animate-unicorn-idle flex items-center justify-center gap-2"
        >
          <!-- ⭐️ Reduced the sparkle sizes by 20% using smaller text layers -->
          <span class="text-4xl md:text-6xl text-amber-300">✨</span>
          <span>{{ game.currentWordItem?.emoji }}</span>
          <span class="text-4xl md:text-6xl text-amber-300">✨</span>
        </div>
      </div>

      <!-- 📥 THE SPELLING SLOTS (What she has built so far) -->
      <div class="flex items-center justify-center gap-3 md:gap-4 my-2">
        <!-- Target slot mapping based on full word length -->
        <div
          v-for="(letter, index) in game.currentWordItem?.word"
          :key="'slot-'+index"
          class="w-16 h-20 md:w-24 md:h-28 text-4xl md:text-6xl font-black rounded-2xl flex items-center justify-center transition-all duration-200 border-2 shadow-sm"
          :class="[
            game.userSpelling[index]
              ? 'bg-gradient-to-b from-pink-400 to-pink-500 text-white border-pink-600'
              : 'bg-white/50 border-dashed border-pink-300 text-transparent',
          ]"
        >
          {{ game.userSpelling[index] || '' }}
        </div>
      </div>

      <!-- Feedback / Guidance Subtext Banner -->
      <div class="h-10 text-center px-4 font-black text-lg md:text-2xl">
        <span
          v-if="game.isCorrect === true"
          class="text-emerald-600 block drop-shadow-sm animate-pulse"
        >
          HURRA! Du klarte det! 💖🎉
        </span>
        <span
          v-else-if="game.isCorrect === false"
          class="text-rose-600 block drop-shadow-sm"
        >
          Oi! Prøv å stave ordet på nytt! ✨
        </span>
      </div>

      <!-- 🎴 THE CHOICES ROW (Scrambled letters available to press) -->
      <div class="w-full flex items-center justify-center gap-4 md:gap-6 min-h-[90px] md:min-h-[130px]">
        <button
          v-for="(letter, index) in game.scrambledLetters"
          :key="'choice-'+index"
          class="w-16 h-18 md:w-24 md:h-26 text-4xl md:text-6xl font-black rounded-3xl text-purple-600 bg-gradient-to-b from-white to-purple-50 border-2 border-purple-200 border-b-4 hover:border-purple-300 active:scale-95 shadow-md active:bg-purple-100 transition-all duration-150"
          style="touch-action: manipulation;"
          @click="game.selectLetter(letter, index)"
        >
          {{ letter }}
        </button>
      </div>

      <!-- 🔄 Control Dashboard Triggers -->
      <div class="flex items-center gap-4 mt-4">
        <!-- Undo button to safely reset the letters layout -->
        <button
          v-if="game.isCorrect !== true && game.userSpelling.length > 0"
          class="px-5 py-2.5 font-bold text-xs md:text-sm text-slate-500 bg-white border border-slate-200 rounded-2xl active:scale-95 shadow-sm transition hover:bg-slate-50"
          @click="game.resetCurrentWord()"
        >
          ↩️ Slett og prøv igjen
        </button>

        <!-- Dynamic trigger to continue looping fresh words -->
        <button
          v-if="game.isCorrect === true"
          class="px-8 py-4 font-black text-lg md:text-xl text-white bg-gradient-to-b from-purple-400 to-purple-500 border-b-4 border-purple-600 rounded-3xl active:scale-95 shadow-md hover:from-purple-500 hover:to-purple-600 transition"
          @click="game.generateNewWord()"
        >
          Neste ord 👑▶
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  touch-action: manipulation;
}

.animate-unicorn-idle {
  animation: unicornFloat 3s ease-in-out infinite;
}
@keyframes unicornFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-princess-celebrate {
  animation: unicornJump 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate;
  filter: drop-shadow(0 0 35px rgba(244, 114, 182, 1));
}
@keyframes unicornJump {
  0% { transform: translateY(0) scale(1) rotate(-5deg); }
  100% { transform: translateY(-40px) scale(1.3) rotate(5deg); }
}

.animate-unicorn-sad {
  animation: unicornShake 0.4s ease-in-out;
}
@keyframes unicornShake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}

.animate-score-pop {
  animation: scoreHeartbeat 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.5);
}
@keyframes scoreHeartbeat {
  0% { transform: scale(1); }
  30% { transform: scale(1.4); }
  100% { transform: scale(1); }
}
</style>
