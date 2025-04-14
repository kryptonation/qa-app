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
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <router-link
            to="/"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Ask a Question
          </router-link>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Questions Section -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Questions</h2>
            
            <div v-if="questions.length === 0" class="text-center py-8">
              <p class="text-gray-500">No questions available.</p>
            </div>

            <div class="space-y-6">
              <div
                v-for="question in sortedQuestions"
                :key="question.timestamp"
                class="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium text-gray-800">{{ question.topic }}</h3>
                    <p class="text-sm text-gray-500">To: {{ getUserName(question.to) }}</p>
                  </div>
                  <button
                    @click="deleteQuestion(question)"
                    class="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
                <p class="text-gray-700 text-sm mb-1">{{ question.question }}</p>
                <time class="text-xs text-gray-500" :datetime="question.timestamp">
                  {{ formatDate(question.timestamp) }}
                </time>
              </div>
            </div>
          </div>

          <!-- Users Section -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Users</h2>
            
            <div v-if="users.length === 0" class="text-center py-8">
              <p class="text-gray-500">No users available.</p>
            </div>

            <div class="space-y-4">
              <div
                v-for="user in users"
                :key="user.email"
                class="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 class="font-medium text-gray-800">{{ user.name }}</h3>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">
                    {{ getQuestionCount(user.email) }} questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const questions = ref([])
const users = ref([])

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

// Get question count for user
const getQuestionCount = (email) => {
  return questions.value.filter(q => q.to === email).length
}

// Sort questions by timestamp, newest first
const sortedQuestions = computed(() => {
  return [...questions.value].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )
})

// Delete question
const deleteQuestion = async (question) => {
  if (!confirm('Are you sure you want to delete this question?')) {
    return
  }

  try {
    console.log('Deleting question:', question)
    const updatedQuestions = questions.value.filter(q => q.timestamp !== question.timestamp)
    console.log('Questions after filter:', updatedQuestions)
    
    const response = await fetch('/api/update-yaml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions: updatedQuestions })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Server error:', errorData)
      throw new Error(errorData.error || 'Failed to delete question')
    }

    const result = await response.json()
    console.log('Server response:', result)

    questions.value = updatedQuestions
    alert('Question deleted successfully!')
  } catch (error) {
    console.error('Error deleting question:', error)
    alert('Failed to delete question. Please try again.')
  }
}

onMounted(async () => {
  try {
    console.log('Loading admin data...')
    const response = await fetch('/api/questions')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    console.log('Received admin data:', data)
    
    questions.value = data.questions || []
    users.value = data.users || []
    
    console.log('Updated questions:', questions.value)
    console.log('Updated users:', users.value)
  } catch (error) {
    console.error('Error loading data:', error)
    alert('Failed to load data. Please refresh the page.')
  }
})
</script> 