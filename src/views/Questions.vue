<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
    <header class="py-6 bg-white/70 backdrop-blur-sm shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <img src="/logo.png" alt="Logo" style="width: 200px; height: auto;" />
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Questions</h1>
          <router-link
            to="/"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Back to Home
          </router-link>
        </div>

        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-500">Loading questions...</p>
        </div>

        <div v-else-if="error" class="text-center py-8">
          <p class="text-red-500">{{ error }}</p>
          <button 
            @click="loadQuestions" 
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>

        <div v-else-if="sortedQuestions.length === 0" class="text-center py-8">
          <p class="text-gray-500">No questions have been asked yet.</p>
          <router-link
            to="/"
            class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ask a Question
          </router-link>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="question in sortedQuestions"
            :key="question.timestamp"
            class="bg-white rounded-xl shadow-sm p-6 transition hover:shadow-md"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-medium text-gray-800">{{ question.topic }}</h3>
                <p class="text-sm text-gray-500">To: {{ getUserName(question.to) }}</p>
              </div>
              <time 
                :datetime="question.timestamp" 
                class="text-xs text-gray-500"
              >
                {{ formatDate(question.timestamp) }}
              </time>
            </div>
            <p class="text-gray-700">{{ question.question }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const questions = ref([])
const users = ref([])
const loading = ref(true)
const error = ref(null)
let pollInterval = null

// Format date helper
const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get user name helper
const getUserName = (email) => {
  const user = users.value.find(u => u.email === email)
  return user ? user.name : email
}

// Sort questions by timestamp, newest first
const sortedQuestions = computed(() => {
  console.log('Computing sorted questions from:', questions.value)
  return [...questions.value].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )
})

const loadQuestions = async () => {
  // Don't show loading indicator on refreshes
  if (!questions.value.length) {
    loading.value = true
  }
  error.value = null
  
  try {
    console.log('Fetching questions from API...')
    const response = await fetch('/api/questions')
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions')
    }
    
    const data = await response.json()
    console.log('Received data from API:', data)
    
    questions.value = data.questions || []
    users.value = data.users || []
    
    console.log('Updated questions:', questions.value)
    console.log('Updated users:', users.value)
  } catch (err) {
    console.error('Error loading questions:', err)
    error.value = 'Failed to load questions. Please try again.'
  } finally {
    loading.value = false
  }
}

// Start polling when component mounts
onMounted(() => {
  loadQuestions()
  // Poll every 2 seconds for updates
  pollInterval = setInterval(loadQuestions, 2000)
})

// Clean up polling when component unmounts
onUnmounted(() => {
  if (pollInterval) {
    clearInterval(pollInterval)
  }
})
</script> 