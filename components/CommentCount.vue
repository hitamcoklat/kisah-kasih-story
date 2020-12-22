<template>
    <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
        <CommentIcon class="_8-yf5 fill-current dark:text-white" />
        <span class="ml-2 dark:text-white">{{ jmlComment }}</span>  
    </button>          
</template>
<script lang="ts">

import Vue from 'vue'
import CommentIcon from '@/assets/icons/comment.svg'

export default Vue.extend({

    data: () => {
        const data: {
            jmlComment: number,     
        } = {
            jmlComment: 0,  
        }
        return data
    },    

    props: {
        idPost: String
    },    

    components: {
        CommentIcon
    },

    methods: {
        async fetchData(idPost:string) {
            const res = await this.$axios.get(process.env.apiURL + '/comment/count/' + idPost)
            this.jmlComment = res.data.data
        }
    },

    created() {
        this.fetchData(this.idPost)
    }

})
</script>