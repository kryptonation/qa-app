<template>
  <div class="min-h-screen bg-gradient-to-br from-[#e8f5e9] to-[#e3f2fd]">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <img src="/cvx-logo.png" alt="ConceptVines" class="h-12 w-auto" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link 
                to="/" 
                class="border-transparent text-gray-500 hover:border-green-500 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-green-500 text-green-600"
              >
                Home
              </router-link>
              <router-link 
                to="/feedback" 
                class="border-transparent text-gray-500 hover:border-green-500 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-green-500 text-green-600"
              >
                Submit Feedback
              </router-link>
              <router-link 
                to="/view" 
                class="border-transparent text-gray-500 hover:border-green-500 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-green-500 text-green-600"
              >
                View Feedback
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// No need for API calls in App.vue anymore
</script>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  color: #1f2937;
}

/* Focus styles for better accessibility */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #22c55e;
  outline-offset: 2px;
}
</style>
