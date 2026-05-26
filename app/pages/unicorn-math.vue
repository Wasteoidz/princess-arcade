<script setup>
import confetti from 'canvas-confetti'

const game = useGameStore()

// Trigger the explosion whenever she wins
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
      'from-pink-50 to-purple-100': game.isCorrect === null,
      'from-emerald-100 to-teal-200': game.isCorrect === true,
      'from-rose-100 to-orange-100': game.isCorrect === false,
    }"
  >
    <div class="w-full max-w-md md:max-w-2xl flex justify-between items-center text-lg md:text-2xl font-bold border-b-2 border-pink-200/60 pb-4">
      <NuxtLink
        to="/"
        class="text-pink-500 hover:text-pink-600 text-xs md:text-sm font-bold bg-white px-3 py-1.5 md:px-5 md:py-2 rounded-2xl shadow-sm border border-pink-200 active:scale-95 transition-transform"
      >
        ◀ Menu
      </NuxtLink>
      <span class="font-black text-purple-600 tracking-wide text-base md:text-2xl">Unicorn Math</span>
      <span
        class="text-amber-500 bg-white px-3 py-1 md:px-5 md:py-1.5 rounded-2xl shadow-sm border border-amber-100 transition-all duration-300"
        :class="{ 'animate-score-pop': game.isCorrect === true }"
      >
        👑 {{ game.score }}
      </span>
    </div>

    <div class="w-full max-w-md md:max-w-2xl flex flex-col items-center my-auto gap-4 md:gap-8">
      <div class="text-7xl md:text-9xl drop-shadow-md h-24 md:h-36 flex items-center justify-center transition-all duration-300">
        <div
          v-if="game.isCorrect === true"
          class="animate-unicorn-celebrate"
        >
          💖🦄💖
        </div>
        <div
          v-else-if="game.isCorrect === false"
          class="animate-unicorn-sad text-6xl md:text-8xl"
        >
          🥺🦄
        </div>
        <div
          v-else
          class="animate-unicorn-idle"
        >
          ✨🦄✨
        </div>
      </div>

      <div class="flex flex-col items-center justify-center gap-4 md:gap-8 py-4 w-full">
        <div class="flex items-center justify-center gap-3 md:gap-5 flex-wrap min-h-[50px] md:min-h-[75px]">
          <div
            v-for="i in game.num1"
            :key="'fl-'+i"
            class="text-4xl md:text-6xl filter drop-shadow-sm inline-block transform-gpu"
            :class="{ 'animate-item-celebrate': game.isCorrect === true }"
          >
            🌸
          </div>
        </div>

        <div
          class="text-3xl md:text-5xl font-black text-pink-400"
          :class="{ 'animate-spin-slow': game.isCorrect === true }"
        >
          ➕
        </div>

        <div class="flex items-center justify-center gap-3 md:gap-5 flex-wrap min-h-[50px] md:min-h-[75px]">
          <div
            v-for="i in game.num2"
            :key="'st-'+i"
            class="text-4xl md:text-6xl filter drop-shadow-sm inline-block transform-gpu"
            :class="{ 'animate-item-celebrate': game.isCorrect === true }"
          >
            ✨
          </div>
        </div>

        <div class="h-12 text-center px-4 font-black text-lg md:text-2xl mt-4">
          <span
            v-if="game.isCorrect === true"
            class="text-emerald-600 block drop-shadow-sm"
          >
            Magical! The unicorn loves it! 💖
          </span>
          <span
            v-else-if="game.isCorrect === false"
            class="text-rose-600 block max-w-xs md:max-w-xl drop-shadow-sm"
          >
            Oops! {{ game.lastChosen }} is not correct. Count them and try again!
          </span>
        </div>
      </div>

      <div class="w-full max-w-md md:max-w-xl grid grid-cols-3 gap-3 md:gap-6 pb-4">
        <button
          v-for="choice in game.choices"
          :key="choice"
          class="h-20 md:h-28 text-3xl md:text-5xl font-black rounded-3xl text-white bg-gradient-to-b from-pink-400 to-pink-500 active:from-pink-500 active:to-pink-600 shadow-md active:scale-95 border-b-4 border-pink-600 transition-all duration-150"
          style="touch-action: manipulation;"
          @click="game.checkAnswer(choice)"
        >
          {{ choice }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  touch-action: manipulation;
}

/* 🦄 Unicorn Animation States */
.animate-unicorn-idle {
  animation: unicornFloat 3s ease-in-out infinite;
}
@keyframes unicornFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-unicorn-celebrate {
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

/* 🌸✨ Block Item Spin Explosion */
.animate-item-celebrate {
  animation: itemPopUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.5) forwards;
}
@keyframes itemPopUp {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.6) rotate(180deg); }
  100% { transform: scale(1.1) rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* 👑 Score Badge Heartbeat */
.animate-score-pop {
  animation: scoreHeartbeat 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.5);
}
@keyframes scoreHeartbeat {
  0% { transform: scale(1); }
  30% { transform: scale(1.4); background-color: #fef3c7; }
  100% { transform: scale(1); }
}
</style>
