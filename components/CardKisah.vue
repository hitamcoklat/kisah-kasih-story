<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">         
        <div>
            <div v-for="(item, index) in dataPost" :key="index" class="mx-auto transition delay-150 duration-300 mb-5 ease-in-out px-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
                <div class="py-5 flex flex-row items-center justify-between">
                    <div class="flex flex-row items-center">
                        <a href="#" class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
                        <svg
                            class="h-6 w-6 text-indigo-500 fill-current dark:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                        </svg>
                        <p class="ml-1 font-medium dark:text-white text-xl">@{{ item.username }}</p>
                        </a>
                    </div>
                </div>
                <div @click="toDetailPost(item)" class="py-2 cursor-pointer">
                    <p class="leading-snug text-xl dark:text-white">{{ item.title }}</p>
                </div>            
                <div class="mt-2">
                    <div class="py-5 mt-2 flex flex-row items-center">
                        <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
                            <LoveIcon class="_8-yf5 fill-current dark:text-white" />  
                            <span class="ml-2 dark:text-white">{{ item.likes || 0 }}</span>
                        </button>
                        <CommentCount :idPost="item._id" />                        
                        <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
                            <ShareIcon class="_8-yf5 fill-current dark:text-white" />
                        <span class="ml-2 dark:text-white">0</span>
                        </button>
                    </div>
                </div>
            </div>                            
        </div> 
        <div class="shadow rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-200 h-12 w-12"></div>
                <div class="flex-1 space-y-4 py-1">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                </div>
            </div>
        </div>                      
    </div>
</template>
<script lang="ts">

import Vue from 'vue'
import LoveIcon from '@/assets/icons/love.svg'
import CommentIcon from '@/assets/icons/comment.svg'
import ShareIcon from '@/assets/icons/shared.svg'
import CommentCount from '@/components/CommentCount.vue'

export default Vue.extend({

    data: () => {
        const data: {
            msg: string,
            ip: string,
            page: number,
            loading: boolean,
            dataPost: any[]          
        } = {
            msg: 'Hallo Septian',
            ip: '',
            page: 1,
            loading: false,
            dataPost: []  
        }
        return data
    },

    components: {
        LoveIcon,
        CommentIcon,
        ShareIcon,
        CommentCount
    },     

    methods: {
        fetchData: async function() {
            this.loading = true
            const dataPost = await this.$axios.$get(process.env.apiURL + '/kisah/read?page=' + this.page)
            this.dataPost = dataPost.data
            setTimeout(() => {
                this.loading = false
                this.$emit('loadStatus', true)
            }, 1000);
        },
        toDetailPost: function(item: any) {
            this.$router.push('/post/' + item._id)
        },
        async loadMore(): Promise<any> {
            this.loading = true
            this.page = this.page + 1
            let getData = await this.$axios.$get(process.env.apiURL + '/kisah/read?page=' + this.page)
            getData.data.forEach((element: any) => {
                this.dataPost.push(element)
            });
            setTimeout(() => {
                this.loading = false
            }, 1000);            
        }
    },

    created() {
        this.fetchData()
    }    
})

</script>