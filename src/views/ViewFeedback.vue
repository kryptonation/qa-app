<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-[#2196f3]">Team Feedback Dashboard</h2>
      <button
        @click="handleLogout"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
    
    <div v-if="feedbacks.length === 0" class="text-center text-gray-500">
      No feedbacks have been shared yet.
    </div>

    <div v-else class="space-y-6">
      <div v-for="feedback in sortedFeedbacks" :key="feedback.timestamp" 
           class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-[#2196f3]">
            {{ feedback.name || 'Team Member' }}
          </h3>
          <span class="text-sm text-gray-500">
            {{ formatDate(feedback.timestamp) }}
          </span>
        </div>
        
        <div class="mb-4">
          <span class="inline-block bg-[#e8f5e9] text-[#4caf50] text-xs font-semibold px-2.5 py-0.5 rounded">
            {{ feedback.favoriteTopic }}
          </span>
        </div>
        
        <p class="text-gray-700 whitespace-pre-wrap">{{ feedback.feedback }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const feedbacks = ref([])

const sortedFeedbacks = computed(() => {
  return [...feedbacks.value].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )
})

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}

onMounted(() => {
  // Check authentication
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) {
    router.push('/login')
    return
  }

  const storedFeedbacks = localStorage.getItem('feedbacks')
  if (storedFeedbacks) {
    feedbacks.value = JSON.parse(storedFeedbacks)
  }
})
</script> 