<template>
  <div class="flex flex-row transition delay-150 duration-300 ease-in-out justify-between dark:bg-gray-900 bg-white py-4">
    <div>
        <p @click="toHome" class="dark:text-white font-black antialiased text-6xl italic">Kisah.</p>
    </div>
    <div>
      <button @click="showModal = !showModal" type="button" class="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 rounded">
        <svg
            class="h-6 w-6 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

      </button>
    </div>
    <div v-if="showModal" class="overflow-x-hidden w-xl overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative mx-auto w-xl">
        <!--content-->
        <div class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
            <h3 class="text-xl font-semibold">Menu</h3>
          </div>
          <!--body-->
          <div class="p-2 flex-auto">
            <button class="bg-grey-light w-full hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                <span>Download</span>
            </button>              
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="showModal = false">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>    
  </div>    
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

  data () {
    return {
      showModal: false
    }
  },

  methods: {
      toHome() {
          this.$router.push('/')
      }
  },

  created() {
  }

})
</script>
