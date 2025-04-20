<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-[#e3f2fd]">
    <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <img src="/cvx-logo.png" alt="ConceptVines" class="h-20 mx-auto mb-4" />
        <h2 class="text-3xl font-bold text-[#2196f3]">Admin Login</h2>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4caf50] focus:ring-[#4caf50]"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4caf50] focus:ring-[#4caf50]"
            placeholder="Enter your password"
            required
          />
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#2196f3] to-[#4caf50] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4caf50]"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = () => {
  if (form.email === 'admin@cvxevent.com' && form.password === 'cvxevent123') {
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/view')
  } else {
    error.value = 'Invalid email or password'
  }
}
</script> 