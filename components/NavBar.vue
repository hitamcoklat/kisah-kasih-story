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
            <h3 class="text-3xl text-black py-5 pl-5 font-semibold">Tentang</h3>
          </div>
          <!--body-->
          <div class="p-2 flex-auto py-10 px-10">
            <p class="text-black text-justify text-base"><strong>Kisah</strong>. Merupakan sebuah platform baca, berasal dari kumpulan2 artikel/tulisan yang ada di internet dan dikumpulkan dengan metoda scrapping. Mohon berkomentar yang bijak untuk mencerminkan netizen yang budiman, baik hati dan rajin menabung. :)</p>      
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style="transition: all .15s ease" @click="showModal = false">
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
