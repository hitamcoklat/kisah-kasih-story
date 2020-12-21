<template>
<div class="grid grid-cols-1 max-w-xl gap-6 px-4 mx-auto md:px-6 lg:px-8">
  <NavBar />
  <CardKisah @loadStatus="onLoadStatus" />
  <ToggleLight v-if="loading == false" />
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import CardKisah from '@/components/CardKisah.vue'
import NavBar from '@/components/CardKisah.vue'
import ToggleLight from '@/components/ToggleLight.vue'

export default Vue.extend({

  data () {
    return {
      loading: true
    }
  },

  methods: {
    onLoadStatus(value: boolean) {
      this.loading = !value
      console.log('Load Status: ' + value)
    }
  },

  created() {

  },

})
</script>
