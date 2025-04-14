<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
    <header class="py-6 bg-white/70 backdrop-blur-sm shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <img src="/logo.png" alt="Logo" style="width: 200px; height: auto;" />
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 mt-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Ask a Question</h1>
          
          <form @submit.prevent="submitQuestion" class="space-y-6">
            <div>
              <label for="topic" class="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input
                type="text"
                id="topic"
                v-model="form.topic"
                class="form-input"
                placeholder="Enter the topic of your question"
                required
              />
            </div>

            <div>
              <label for="to" class="block text-sm font-medium text-gray-700 mb-1">To</label>
              <select
                id="to"
                v-model="form.to"
                class="form-select"
                required
              >
                <option value="" disabled>Select a user</option>
                <option v-for="user in users" :key="user.email" :value="user.email">
                  {{ user.name }}
                </option>
              </select>
            </div>

            <div>
              <label for="question" class="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <textarea
                id="question"
                v-model="form.question"
                rows="4"
                class="form-textarea"
                placeholder="Type your question here..."
                required
              ></textarea>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm w-full sm:w-auto"
              >
                Submit Question
              </button>
              <button
                type="button"
                @click="generateQuestion"
                class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm w-full sm:w-auto group transition-all duration-300 ease-in-out"
              >
                <span class="flex items-center">
                  <span class="mr-2 group-hover:rotate-180 transition-transform duration-300">✨</span>
                  Generate a Question
                </span>
              </button>
            </div>
          </form>
        </div>

        <div class="mt-6 flex justify-center space-x-4">
          <router-link
            to="/admin"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            Admin View
          </router-link>
          <router-link
            to="/questions"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
            </svg>
            View Questions
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref([])
const form = ref({
  topic: '',
  to: '',
  question: ''
})

// List of fun questions
const funQuestions = [
  "If you could have any superpower, but it only works on Tuesdays between 3-4 PM, what would you choose? 🦸‍♂️",
  "If your pet could suddenly speak human language for 5 minutes, what would be the most embarrassing secret they'd reveal? 🐱",
  "If you had to eat one food for the rest of your life but it had to be a different color than its natural color, what would you choose? 🌈",
  "If you could instantly become an expert in something totally useless, what skill would you pick? 🎯",
  "If you had to replace your hands with any two objects, what would you choose and why? 🤲",
  "If you could teleport anywhere but you always arrive doing jazz hands, where would you go first? ✨",
  "If your laugh had to be replaced with a sound effect, what would you choose? 🔊",
  "If you had to wear a costume to work/school every day, but it couldn't be a superhero costume, what would you pick? 👔",
  "If you could instantly master any dance move but had to perform it every time you hear the word 'the', what move would you choose? 💃",
  "If you could turn any household item into a loyal pet, what would you choose? 🏠",
  "If you could make any vegetable taste like any dessert, what combination would you create? 🥕🍰",
  "If you had to communicate only using movie quotes for a day, which movie would you choose? 🎬",
  "If you could have any animal's ability but it only works when you're singing, what would you pick? 🎵",
  "If your shadow had to be replaced with something else, what would you want it to be? 👥",
  "If you could instantly summon a crowd of people to applaud anything you do, what mundane task would you use it for? 👏",
  "If you could turn any famous painting into a 3D reality but had to live in it, which would you choose? 🎨",
  "If your sneezes could change the weather, what weather pattern would you want them to create? 🌤️",
  "If you could combine any two animals to create a new pet, what would you mix? 🦒🐘",
  "If your dreams came with a laugh track, what would be your most embarrassing dream moment? 😅",
  "If you could make any inanimate object tell its life story, which would you pick? 📖",
  "If you had to replace all your clothes with items made from one food, what food would you choose? 🥑",
  "If your fingerprints left behind tiny flowers instead of prints, what type of flowers would they be? 🌸",
  "If you could turn any famous historical event into a musical, which would you choose? 🎭",
  "If your hair changed color based on your mood, what would be your most frequent color? 🌈",
  "If you could make any sound echo as rainbow sparkles, what sound would you pick? ✨",
  "If you had to give a TED talk about your most useless talent, what would it be about? 🎤",
  "If your shoes could talk, what personality would your favorite pair have? 👞",
  "If you could turn any book into a smell, which book would make the best perfume? 📚",
  "If you had to replace all doors with something else that opens and closes, what would you choose? 🚪",
  "If your belly button was a button that did something, what would you want it to do? 👆",
  "If you could make any constellation come to life for a day, which would you pick? ⭐",
  "If your reflection could do something different than you, what would you want it to do? 🪞",
  "If you could turn any famous monument into candy, which would you choose and what flavor? 🍬",
  "If your eyebrows could control something in your house, what would you want them to control? 🤨",
  "If you could make any object float but only on Thursdays, what would you choose? 🎈",
  "If your kitchen appliances formed a band, what role would each play? 🎸",
  "If you could give any statue in the world the ability to dance, which would you pick? 💃",
  "If your car horn could play any sound instead of honking, what would you choose? 📢",
  "If you could make any famous person's voice your GPS navigator, who would you pick? 🗺️",
  "If your furniture could rearrange itself while you sleep, what pattern would you want it to make? 🛋️",
  "If you could turn any famous movie scene into a smell, which would you choose? 🎬",
  "If your phone could only communicate in emojis, which emoji would you use most? 📱",
  "If you could give any building in the world the ability to do backflips, which would you choose? 🏢",
  "If your memories came with background music, what song would play for your most embarrassing moment? 🎵",
  "If you could make any historical figure be your personal assistant for a day, who would you pick? 👔"
]

onMounted(async () => {
  try {
    const response = await fetch('/api/questions')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const data = await response.json()
    users.value = data.users || []
    console.log('Loaded users:', users.value)
  } catch (error) {
    console.error('Error loading users:', error)
  }
})

const submitQuestion = async () => {
  try {
    console.log('Starting question submission...')
    const response = await fetch('/api/questions')
    if (!response.ok) {
      throw new Error('Failed to fetch current questions')
    }
    const data = await response.json()
    console.log('Current data from server:', data)

    const newQuestion = {
      ...form.value,
      timestamp: new Date().toISOString()
    }
    console.log('New question to add:', newQuestion)
    
    const questions = Array.isArray(data.questions) ? data.questions : []
    questions.push(newQuestion)
    console.log('Updated questions array:', questions)

    const updateResponse = await fetch('/api/update-yaml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions })
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error('Server responded with error:', errorData)
      throw new Error(errorData.error || 'Failed to update questions')
    }

    const updateResult = await updateResponse.json()
    console.log('Server update response:', updateResult)

    form.value = { topic: '', to: '', question: '' }
    alert('Question submitted successfully!')
    router.push('/questions')
  } catch (error) {
    console.error('Error submitting question:', error)
    alert(`Failed to submit question: ${error.message}`)
  }
}

const generateQuestion = () => {
  const randomIndex = Math.floor(Math.random() * funQuestions.length)
  form.value.question = funQuestions[randomIndex]
  form.value.topic = "Nation wants to know"
}
</script>

<style scoped>
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  color: #1f2937;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

@keyframes sparkle {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

.group:hover .group-hover\:rotate-180 {
  animation: sparkle 1s infinite;
}
</style> 