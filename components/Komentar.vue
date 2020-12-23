<template>
    <div class="max-w-xl mt-5 mx-auto transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
        <p class="dark:text-white">Komentar:</p>
        <div class="mt-5">
            <textarea v-model="description" class="w-full p-2 shadow-md rounded border-2 border-gray-400 dark:text-black"></textarea>
            <p v-if="loading" class="uppercase rounded px-8 mt-2 py-2 bg-green-600 text-blue-50 w-full shadow-sm hover:shadow-md text-center">Loading...</p>
            <button v-if="loading == false" @click="sendComment" class="uppercase rounded px-8 mt-2 py-2 bg-green-600 text-blue-50 w-full shadow-sm hover:shadow-md">Kirim Komentar</button>
        </div>            
        <p class="dark:text-white mt-4">{{ jmlComment }} Komentar Netizen:</p>
        <div class="mt-5">            
            <p v-for="(item, index) in dataComment" :key="index" class="w-full p-5 shadow-md rounded border-1 border-gray-400 dark:text-white">
                <strong>{{item.author}}</strong><br />
                <span class="font-thin text-xs italic">{{ new Date(item.time).toGMTString() }}</span><br />
                {{ item.description }}
            </p>
            <!-- <p @click="loadMore" v-if="loadMoreStatus == true" class="cursor-pointer uppercase rounded px-8 mt-2 py-5 w-full dark:text-white text-center font-bold">Load More</p> -->
        </div>            
    </div>    
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  
    data: () => {
        const data: {
            description: string,
            loading: boolean,
            loadMoreStatus: boolean,
            page: number,
            jmlComment: number,
            dataComment: any[],
            csrfToken: string      
        } = {
            description: '',
            loading: false,
            loadMoreStatus: true,
            page: 1,
            jmlComment: 0,
            dataComment: [],
            csrfToken: ''
        }
        return data
    },
    props: {
        idPost: String
    },
    methods: {
        async sendComment() {
            if(this.description == '') {
                return alert('Mohon isi kolom komentar!')
            }
            this.loading = true
            let arrayAuthor = ['Aligator', 'Netizen', 'Squirrel', 'Panda', 'Mammals', 'Goldfish', 'Sheep']
            let random:any = arrayAuthor[Math.floor(Math.random() * arrayAuthor.length)];
            let dataKirim = {
                author: random,
                description: this.description,
                idPost: this.idPost,
                _csrf: this.csrfToken
            }
            console.log(dataKirim)
            const res = await this.$axios.create({withCredentials: true}).post(process.env.apiURL + '/comment/add/', dataKirim, {
                headers: { 'X-CSRF-TOKEN': this.csrfToken }
            })
            if(res.data.status == false) {
                alert(res.data.msg)
            }
            this.fetchData()
            this.description = ""
            this.loading = false
        },
        async fetchData() {
            this.loading = true
            const res = await this.$axios.create({withCredentials: true}).get(process.env.apiURL + '/comment/read/' + this.idPost)
            if(res.data.status == true) {
                this.dataComment = res.data.data.data.reverse()
                this.jmlComment = JSON.parse(JSON.stringify(res.data.data.data)).length
            }
            this.csrfToken = res.data.csrfToken
            this.loading = false
        },        
    },

    async created() {
        await this.fetchData()
        this.$emit('emitJmlComment', this.jmlComment);
    }

})
</script>