<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-[#2196f3] mb-8 text-center">Share Your Feedback</h2>
    
    <form @submit.prevent="submitFeedback" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name (Optional)</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4caf50] focus:ring-[#4caf50]"
          placeholder="Anonymous"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Event Highlight</label>
        <div class="mt-2 space-y-2">
          <div v-for="topic in topics" :key="topic" class="flex items-center">
            <input
              :id="topic"
              v-model="form.favoriteTopic"
              :value="topic"
              type="radio"
              class="h-4 w-4 text-[#4caf50] focus:ring-[#4caf50] border-gray-300"
              required
            />
            <label :for="topic" class="ml-3 block text-sm font-medium text-gray-700">
              {{ topic }}
            </label>
          </div>
        </div>
      </div>

      <div>
        <label for="feedback" class="block text-sm font-medium text-gray-700">Your Thoughts</label>
        <textarea
          id="feedback"
          v-model="form.feedback"
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4caf50] focus:ring-[#4caf50]"
          placeholder="Share your experience and suggestions..."
          required
        ></textarea>
      </div>

      <div class="flex justify-between">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#2196f3] to-[#4caf50] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4caf50] disabled:opacity-50"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Feedback' }}
        </button>
        <button
          type="button"
          @click="generateFunFeedback"
          :disabled="isGenerating"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-l from-[#2196f3] to-[#4caf50] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196f3] disabled:opacity-50"
        >
          {{ isGenerating ? 'Generating...' : 'Generate Creative Response' }}
        </button>
      </div>
    </form>

    <!-- Generated Response Preview -->
    <div v-if="generatedFeedback" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div class="flex justify-between items-center mb-2">
        <label class="block text-sm font-medium text-gray-700">Generated Response</label>
        <span class="text-sm text-gray-500">{{ generatedFeedback.length }}/300 characters</span>
      </div>
      <p class="text-gray-600 text-sm">{{ generatedFeedback }}</p>
      <button
        @click="useGeneratedFeedback"
        class="mt-3 inline-flex justify-center py-1 px-3 border border-transparent text-sm rounded-md text-white bg-[#4caf50] hover:opacity-90"
      >
        Use This Response
      </button>
    </div>

    <!-- Toast Messages -->
    <div 
      v-if="toast.show" 
      class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300"
      :class="{
        'bg-green-600': toast.type === 'success',
        'bg-red-600': toast.type === 'error'
      }"
    >
      <div class="flex items-center">
        <span v-if="toast.type === 'success'" class="mr-2">✅</span>
        <span v-else class="mr-2">❌</span>
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const topics = [
  'Leadership Sessions (Vision, Strategy, Approach, etc)',
  'Company Culture & Values',
  'Focus 2025 – Playbooks',
  'Technical Innovation Spotlight (SpeedX, BPM, Etc)',
  'Project Spotlight (AWS, Hitachi, Intel, Big Apple, Prestige, KYG)',
  'Team meet-up, collaboration & sharing opportunities',
  'Event Logistics (Venue, Food, etc)',
  'CVX 2026 - What more would you like to see?'
]

const form = reactive({
  name: '',
  favoriteTopic: '',
  feedback: ''
})

const isGenerating = ref(false)
const isSubmitting = ref(false)
const generatedFeedback = ref('')
const toast = reactive({
  show: false,
  type: 'success',
  message: ''
})

const showToast = (type, message) => {
  toast.type = type
  toast.message = message
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

const submitFeedback = async () => {
  if (!form.favoriteTopic) {
    showToast('error', 'Please select an Event Highlight')
    return
  }

  if (!form.feedback.trim()) {
    showToast('error', 'Please share your thoughts')
    return
  }

  isSubmitting.value = true
  try {
    // Store feedback in localStorage
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    feedbacks.push({
      ...form,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks))
    
    showToast('success', 'Thank you for sharing your feedbacks! Your feedback has been submitted successfully.')
    
    // Reset form
    form.name = ''
    form.favoriteTopic = ''
    form.feedback = ''
    generatedFeedback.value = ''

    // Optional: Redirect to home page after successful submission
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    console.error('Error submitting feedback:', error)
    showToast('error', 'Failed to submit feedback. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const useGeneratedFeedback = () => {
  form.feedback = generatedFeedback.value
  generatedFeedback.value = ''
}

const generateFunFeedback = async () => {
  if (!form.favoriteTopic) {
    showToast('error', 'Please select an Event Highlight first')
    return
  }

  isGenerating.value = true
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDyMyVxiMBnc5vaQSOFek1vRokRd1MEvUA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a brief (max 300 characters) enthusiastic and professional response about the ConceptVines Xperience 2025 internal tech event, focusing on ${form.favoriteTopic || 'the innovative spirit and collaborative atmosphere'}. Make it engaging while maintaining a corporate tech-forward tone.`
          }]
        }]
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data || !data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from API')
    }

    // Truncate the response to 300 characters if needed
    const generatedText = data.candidates[0].content.parts[0].text
    generatedFeedback.value = generatedText.slice(0, 300)
  } catch (error) {
    console.error('Error generating response:', error)
    showToast('error', 'Failed to generate response. Using fallback option.')
    // Provide a fallback response based on the selected topic
    const fallbackResponses = {
      'Technical Innovation Showcase': "Impressed by our cutting-edge solutions! The technical demos showcased our commitment to innovation. Looking forward to implementing these groundbreaking ideas! 🚀",
      'Leadership & Vision Sessions': "Inspiring leadership discussions that clearly mapped our future direction. Great feedbacks on industry trends and our strategic positioning! 💫",
      'Company Culture & Values': "Our culture shines through every interaction! Proud to see our values actively shaping our work environment.",
      'Team Collaboration Activities': "Amazing team synergy during the activities! The collaborative exercises really brought out our collective strengths. 🤝",
      'Professional Development Workshops': "Valuable learning opportunities that enhanced our skill set. The workshops were perfectly aligned with our growth goals! 📈",
      'Product Strategy Discussions': "Exciting product roadmap ahead! The strategic planning sessions revealed innovative approaches to market challenges. 💡",
    }

    generatedFeedback.value = fallbackResponses[form.favoriteTopic] || 
      "Fantastic event that showcased our innovative spirit! The perfect blend of technical excellence and collaborative energy. Looking forward to implementing these feedbacks! 🎯"
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 