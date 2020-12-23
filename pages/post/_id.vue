<template>
    <div class="grid grid-cols-1 max-w-xl gap-8 px-4 mx-auto md:px-6 lg:px-8">
        <NavBar />
        <div v-if="loading" class="shadow rounded-md p-4 w-full mx-auto">
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
        <div v-if="loading == false" class="max-w-xl mx-auto transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
            <div class="py-2 flex flex-row items-center justify-between">
                <div class="flex flex-row items-center">
                    <svg
                        class="h-6 w-6 text-indigo-500 fill-current dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                    </svg>
                    <p class="ml-5 font-medium dark:text-white text-xl">@{{ dataPost.username }}</p>
                </div>
            </div>
            <div class="mt-2">
                <p class="text-3xl dark:text-white">{{ txtHeadline }}</p>
                <div class="py-2 mt-2 flex flex-row items-center">
                    <button @click="btnLike(dataPost._id)" class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
                        <LoveIcon class="_8-yf5 fill-current dark:text-white" />  
                    <span class="ml-2 dark:text-white">{{ likeCount || 0 }}</span>
                    </button>
                    <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
                        <CommentIcon class="_8-yf5 fill-current dark:text-white" />
                    <span class="ml-2 dark:text-white">{{ jmlComment || 0 }}</span>
                    </button>
                    <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
                        <ShareIcon class="_8-yf5 fill-current dark:text-white" />
                    <span class="ml-2 dark:text-white">0</span>
                    </button>
                </div>
            </div>
            <div class="py-2">
            <p v-for="(item, index) in dataPost.data" :key="index" class="leading-snug dark:text-white border-t-2 border-dotted border-fuchsia-200 dark:border-gray-900 mt-2 pt-2 text-xl">
                {{ item.text }}
                <img v-for="(v, i) in item.img" :key="i" class="object-cover mt-2 w-full rounded-lg" :src="v" alt="">
            </p>
            </div>
        </div>  
        <ShareNetwork
            network="facebook"
            url="https://kisah.netlify.app"
            title="Kisah."
            :description="txtHeadline"
            hashtags="kisah"
            class="dark:text-white"
        >
            Share on Facebook
        </ShareNetwork>
        <div v-if="loading == false">
            <div class="max-w-xl mx-auto transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
                <a :href="linkAuthor" class="truncate pr-10 dark:text-white">Sumber : {{linkAuthor.substr(0, 28)}}...</a>
            </div>
            <Komentar @emitJmlComment="emitJmlComment" :idPost="idPost" />
            <div class="max-w-xl mt-5 mx-auto transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
                <p class="dark:text-white text-center">Kisah. Merupakan sebuah platform baca, berasal dari kumpulan2 artikel/tulisan yang ada di internet dan dikumpulkan dengan metoda scrapping. </p>
            </div>                   
        </div>
        <ToggleLight v-if="loading == false" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/CardKisah.vue'
import Komentar from '@/components/Komentar.vue'
import ToggleLight from '@/components/ToggleLight.vue'
import LoveIcon from '@/assets/icons/love.svg'
import CommentIcon from '@/assets/icons/comment.svg'
import ShareIcon from '@/assets/icons/shared.svg'

export default Vue.extend({
  
  data () {
    return {
      msg: 'Hallo Septian',
      dataPost: [],
      txtHeadline: '',
      linkAuthor: '',
      idPost: '',
      likeCount: 0,
      jmlComment: 0,
      loading: true,
    }
  },

  components: {
    LoveIcon,
    CommentIcon,
    ShareIcon
  },  

  methods: {
    async fetchPost(id: any) {
        const data = await this.$axios.$get(process.env.apiURL + '/kisah/detail/' + id)
        this.dataPost = data.data
        this.likeCount = data.data.likes || 0
        this.linkAuthor = data.data.linkAuthor
        this.txtHeadline = JSON.parse(JSON.stringify(data)).data.data[0].text
        this.loading = false
    },
    async btnLike(id: string) {
        const data = await this.$axios.$get(process.env.apiURL + '/kisah/like/' + id)
        this.likeCount = this.likeCount + 1
        console.log('like button')
    },
    toggle: function() {
      this.$colorMode.preference =
         this.$colorMode.value == "light" ? "dark" : "light";
    },
    emitJmlComment: function(value: number) {
        console.log(value)
        this.jmlComment = value
    }
  },

  created() {
    this.idPost = this.$route.params.id
    this.fetchPost(this.$route.params.id)
  }

})
</script>
