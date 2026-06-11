<script setup>
const game = useUnicornMathStore()

// Sets up the game parameters right before navigating
function setMode(modeName) {
  game.currentMode = modeName
  game.generateProblem()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gradient-to-b from-purple-50 to-pink-100 text-slate-800 select-none">
    <!-- Header -->
    <div class="text-center mb-8 md:mb-12">
      <h1 class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 tracking-wide drop-shadow-sm">
        Princess Arcade 👑
      </h1>
      <p class="text-sm md:text-lg font-medium text-purple-400 mt-2">
        Select a magical game to play!
      </p>
    </div>

    <!-- Arcade Grid -->
    <div class="w-full max-w-md md:max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <!-- GAME 1: Unicorn Math (Her Favorite) -->
      <NuxtLink
        to="/unicorn-math"
        class="group text-left p-5 bg-white hover:bg-pink-50 border-2 border-pink-200 rounded-3xl shadow-sm hover:shadow-md active:scale-95 transition-all duration-150 flex items-center gap-4"
        @click="setMode('easy-addition')"
      >
        <span class="text-4xl md:text-5xl filter drop-shadow-sm group-hover:animate-bounce">🦄</span>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl md:text-2xl font-black text-pink-500">
              Unicorn Math
            </h2>
            <span class="text-xs font-bold px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">Active</span>
          </div>
          <p class="text-xs md:text-sm text-slate-500 mt-1">
            Count the cute items and earn sparkly confetti stars!
          </p>
        </div>
      </NuxtLink>

      <!-- GAME 2: Placeholder for our next creation -->
      <div
        class="group text-left p-5 bg-white/60 border-2 border-dashed border-purple-200 rounded-3xl shadow-none flex items-center gap-4 relative overflow-hidden"
      >
        <!-- Sparkle accents to make the placeholder look intriguing -->
        <span class="text-4xl md:text-5xl filter drop-shadow-sm opacity-50 group-hover:scale-110 transition-transform">✨</span>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl md:text-2xl font-black text-purple-300">
              Game 2 Box
            </h2>
            <span class="text-xs font-bold px-2 py-0.5 bg-purple-50 text-purple-400 rounded-full">Coded Soon</span>
          </div>
          <p class="text-xs md:text-sm text-slate-400 mt-1">
            A brand new magical math game is arriving here today!
          </p>
        </div>
      </div>

      <!-- MYSTERY SLOT -->
      <div class="opacity-40 p-5 bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl flex items-center gap-4 cursor-not-allowed">
        <span class="text-4xl md:text-5xl filter grayscale">🔒</span>
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-400">
            Coming Soon...
          </h2>
          <p class="text-xs md:text-sm text-slate-400 mt-1">
            Mystery game under construction.
          </p>
        </div>
      </div>
    </div>

    <!-- Global Score Display -->
    <div class="mt-8 md:mt-12 text-sm md:text-base font-bold text-purple-500 bg-white/80 border border-purple-200/50 px-6 py-2 rounded-full shadow-sm">
      Total High Score: <span class="text-amber-500">👑 {{ game.score }}</span>
    </div>
  </div>
</template>
