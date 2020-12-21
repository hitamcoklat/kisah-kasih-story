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
                        <p class="ml-1 text-base font-medium dark:text-white text-xl">@{{ item.username }}</p>
                        </a>
                    </div>
                </div>
                <div @click="toDetailPost(item)" class="py-2">
                    <p class="leading-snug text-xl dark:text-white">{{ item.title }}</p>
                </div>            
                <div class="mt-2">
                    <div class="py-5 mt-2 flex flex-row items-center">
                        <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
                            <svg aria-label="Like" class="_8-yf5 fill-current dark:text-white" height="32" viewBox="0 0 32 32" width="32">
                                <path d="M28.86 17.34l-3.64-6.4c-.3-.43-.71-.73-1.16-.8a1.12 1.12 0 0 0-.9.21c-.62.5-.73 1.18-.32 2.06l1.22 2.6 1.4 2.45c2.23 4.09 1.51 8-2.15 11.66a9.6 9.6 0 0 1-.8.71 6.53 6.53 0 0 0 4.3-2.1c3.82-3.82 3.57-7.87 2.05-10.39zm-6.25 11.08c3.35-3.35 4-6.78 1.98-10.47L21.2 12c-.3-.43-.71-.72-1.16-.8a1.12 1.12 0 0 0-.9.22c-.62.49-.74 1.18-.32 2.06l1.72 3.63a.5.5 0 0 1-.81.57l-8.91-8.9a1.33 1.33 0 0 0-1.89 1.88l5.3 5.3a.5.5 0 0 1-.71.7l-5.3-5.3-1.49-1.49c-.5-.5-1.38-.5-1.88 0a1.34 1.34 0 0 0 0 1.89l1.49 1.5 5.3 5.28a.5.5 0 0 1-.36.86.5.5 0 0 1-.36-.15l-5.29-5.29a1.34 1.34 0 0 0-1.88 0 1.34 1.34 0 0 0 0 1.89l2.23 2.23L9.3 21.4a.5.5 0 0 1-.36.85.5.5 0 0 1-.35-.14l-3.32-3.33a1.33 1.33 0 0 0-1.89 0 1.32 1.32 0 0 0-.39.95c0 .35.14.69.4.94l6.39 6.4c3.53 3.53 8.86 5.3 12.82 1.35zM12.73 9.26l5.68 5.68-.49-1.04c-.52-1.1-.43-2.13.22-2.89l-3.3-3.3a1.34 1.34 0 0 0-1.88 0 1.33 1.33 0 0 0-.4.94c0 .22.07.42.17.61zm14.79 19.18a7.46 7.46 0 0 1-6.41 2.31 7.92 7.92 0 0 1-3.67.9c-3.05 0-6.12-1.63-8.36-3.88l-6.4-6.4A2.31 2.31 0 0 1 2 19.72a2.33 2.33 0 0 1 1.92-2.3l-.87-.87a2.34 2.34 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.64l-.14-.14a2.34 2.34 0 0 1 0-3.3 2.39 2.39 0 0 1 3.3 0l.14.14a2.33 2.33 0 0 1 3.95-1.24l.09.09c.09-.42.29-.83.62-1.16a2.34 2.34 0 0 1 3.3 0l3.38 3.39a2.17 2.17 0 0 1 1.27-.17c.54.08 1.03.35 1.45.76.1-.55.41-1.03.9-1.42a2.12 2.12 0 0 1 1.67-.4 2.8 2.8 0 0 1 1.85 1.25l3.65 6.43c1.7 2.83 2.03 7.37-2.2 11.6zM13.22.48l-1.92.89 2.37 2.83-.45-3.72zm8.48.88L19.78.5l-.44 3.7 2.36-2.84zM16.5 3.3L15.48 0h2.04L16.5 3.3z"></path>
                            </svg>  
                            <span class="ml-2 dark:text-white">{{ item.likes || 0 }}</span>
                        </button>
                        <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
                            <svg aria-label="Comment" class="_8-yf5 fill-current dark:text-white" height="24" viewBox="0 0 48 48" width="24">
                                <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                            </svg>
                        <span class="ml-2 dark:text-white">0</span>
                        </button>
                        <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
                            <svg aria-label="Share Post" class="_8-yf5 fill-current dark:text-white" height="24" viewBox="0 0 48 48" width="24">
                                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </svg>
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