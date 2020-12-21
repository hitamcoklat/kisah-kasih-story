<template>
  <div class="bg-gray-900 dark:bg-white sticky bottom-3 mt-10 mx-auto rounded px-4 py-4 transition delay-150 duration-300 mb-5 ease-in-out">
    <label for="toogleA" class="flex items-center cursor-pointer">
      <div class="relative">
        <input @click="toggle" id="toogleA" type="checkbox" class="hidden" />
        <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
      </div>
      <div class="ml-3 dark:text-black text-white font-medium">
        {{txtMode}}
      </div>
    </label>
  </div>    
</template>
<style scoped>
.toggle__dot {
  top: -.25rem;
  left: -.25rem;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

  data () {
    return {
      txtMode: 'Mode Gelap',
    }
  },

  methods: {
    toggle: function() {
      this.$colorMode.preference =
         this.$colorMode.value == "light" ? "dark" : "light";
      
      this.txtMode = (this.$colorMode.value == "light") ? 'Mode Terang' : 'Mode Gelap'
    },
  },

  created() {
  }

})
</script>