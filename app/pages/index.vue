<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-pink-100 via-purple-100 to-indigo-100 text-slate-700 select-none text-center">
    <header class="mb-12">
      <div class="text-6xl mb-3 animate-pulse">
        ✨🦄✨
      </div>
      <h1 class="text-5xl font-black tracking-wide bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        Princess Arcade
      </h1>
      <p class="text-purple-600/80 text-lg font-bold mt-1">
        Pick a magical game!
      </p>
    </header>

    <div class="w-full max-w-md grid grid-cols-1 gap-6">
      <NuxtLink
        to="/unicorn-math"
        class="group text-left p-6 bg-white/80 backdrop-blur border-2 border-pink-200 hover:border-pink-300 rounded-3xl shadow-md transition-all active:scale-98 flex items-center gap-5"
      >
        <span class="text-5xl group-hover:animate-bounce filter drop-shadow-sm">🦄</span>
        <div>
          <h2 class="text-2xl font-black text-pink-500">
            Unicorn Math
          </h2>
          <p class="text-purple-600/70 text-sm font-semibold mt-0.5">
            Feed the hungry unicorn magic crystals!
          </p>
        </div>
      </NuxtLink>

      <div
        class="text-left p-6 bg-white/30 border-2 border-dashed border-purple-200 rounded-3xl flex items-center gap-5 opacity-60 cursor-not-allowed"
      >
        <span class="text-5xl">🔒</span>
        <div>
          <h2 class="text-2xl font-black text-purple-400/70">
            Coming Soon
          </h2>
          <p class="text-purple-400/60 text-sm font-medium mt-0.5">
            More fairy magic is on the way!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
