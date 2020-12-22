<template>
  <div class="bg-gray border-l-4 border-orange text-orange-dark p-4" role="alert">
    <p class="font-bold">{{ jmlData }} Thread/Artikel</p>
    <p class="dark:text-white text-black">Jumlah artikel yang tersedia untuk menemani makan siang. Scroll aja terus kebawah.</p>
  </div>    
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

  data () {
    return {
      loading: true,
      jmlData: ''
    }
  },

  methods: {
    async fetchPost() {
        const data = await this.$axios.$get(process.env.apiURL + '/kisah/count')
        console.log(data)
        this.jmlData = new Intl.NumberFormat('de-DE').format(data.data)
    },
  },

  created() {
      this.fetchPost()
  },

})
</script>
