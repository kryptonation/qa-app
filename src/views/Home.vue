<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="text-center">
      <img src="/cvx-logo.png" alt="ConceptVines" class="h-32 mx-auto mb-8" />
      <h1 class="text-4xl font-bold text-[#2196f3] mb-2">ConceptVines</h1>
      <h2 class="text-3xl font-bold text-[#4caf50] mb-6">Xperience 2025</h2>
      <p class="text-xl text-gray-600 mb-8">
        Innovate Together, Transform Tomorrow - Join us in shaping the future of technology!
      </p>
      
      <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 class="text-2xl font-semibold text-[#2196f3] mb-4">Event Feedback</h2>
        <p class="text-gray-600 mb-4">
          Your feedbacks drive our innovation. Help us make 2025 even more impactful!
        </p>
        <router-link
          to="/feedback"
          class="inline-block bg-gradient-to-r from-[#2196f3] to-[#4caf50] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          Share Feedback
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No setup needed for the home page
</script> 