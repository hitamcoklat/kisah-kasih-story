<template>
    <div class="max-w-xl mt-5 mx-auto transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
        <p class="dark:text-white">Komentar:</p>
        <div class="mt-5">
            <textarea v-model="description" class="w-full p-2 shadow-md rounded border-2 border-gray-400 dark:text-black"></textarea>
            <p v-if="loading" class="uppercase rounded px-8 mt-2 py-2 bg-green-600 text-blue-50 w-full shadow-sm hover:shadow-md text-center">Loading...</p>
            <button v-if="isLogged == true" @click="sendComment" class="uppercase rounded px-8 mt-2 py-2 bg-green-600 text-blue-50 w-full shadow-sm hover:shadow-md">Kirim Komentar</button>
            <GoogleLogin v-if="isLogged == false" class="uppercase rounded px-8 mt-2 py-2 bg-green-600 text-blue-50 w-full shadow-sm hover:shadow-md" :params="params" :onSuccess="onSuccess" :onFailure="onFailure" :onCurrentUser="onCurrentUser">Komentar Dengan Akun Google</GoogleLogin>
            <!-- <GoogleLogin :params="params" class="uppercase rounded px-8 mt-2 py-2 bg-red-600 text-blue-50 w-full shadow-sm hover:shadow-md" :logoutButton=true>Logout</GoogleLogin> -->
        </div>            
        <p class="dark:text-white mt-4">{{ jmlComment }} Komentar Netizen:</p>
        <div class="mt-5">            
            <p v-for="(item, index) in dataComment" :key="index" class="w-full p-5 shadow-md rounded border-1 border-gray-400 dark:text-white">
                <strong>{{item.author}}</strong><br />
                <span class="font-thin text-xs italic">{{ new Date(item.time).toGMTString() }}</span><br />
                {{ item.description }}
            </p>
        </div>            
    </div>    
</template>
<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import GoogleLogin from 'vue-google-login';
import { mapMutations } from 'vuex'

export default Vue.extend({
  
    data: () => {
        const data: {
            description: string,
            loading: boolean,
            loadMoreStatus: boolean,
            page: number,
            jmlComment: number,
            dataComment: any[],
            csrfToken: string,
            params: object,
            isLogged: boolean,
            renderParams: object 
        } = {
            description: '',
            isLogged: false,
            loading: false,
            loadMoreStatus: true,
            page: 1,
            jmlComment: 0,
            dataComment: [],
            csrfToken: '',
            params: {
                client_id: "55513693753-626nnc1r1g0ti3d5qp4l9c2jiihc44d7.apps.googleusercontent.com"
            },
            renderParams: {
                longtitle: true
            }
        }
        return data
    },
    components: {
        GoogleLogin
    },
    props: {
        idPost: String
    },
    methods: {
        onSuccess: async function(googleUser: any) {
            let data = googleUser.getBasicProfile()                 
            let dataUser = {
                namaLengkap: data['Ad'],
                idGoogle: data['OT'],
                email: data['du'],
                picture: data['iK']
            }
            const res = await this.$axios.post(process.env.apiURL + '/user/add/', dataUser, {                                           
                headers: { 
                    'withCredentials': false, 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*'
                }
            })
            this.$store.commit('user/add', res.data)
            this.isLogged = true

        },
        onFailure: function() {
            console.log('gagal mengambil data')
        },
        onCurrentUser: function(user: any) {

        },
        async sendComment() {
            if(this.description == '') {
                return alert('Mohon isi kolom komentar!')
            }
            const { dataUser } = this.$store.state.user
            this.loading = true
            let arrayAuthor = ['Aligator', 'Netizen', 'Squirrel', 'Panda', 'Mammals', 'Goldfish', 'Sheep']
            let random:any = arrayAuthor[Math.floor(Math.random() * arrayAuthor.length)];
            let dataKirim = {
                author: dataUser.data.namaLengkap,
                description: this.description,
                idPost: this.idPost,
                _csrf: this.csrfToken
            }
            const res = await this.$axios.post(process.env.apiURL + '/comment/add/', dataKirim, {                                           
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization' : 'Bearer ' + dataUser.accessToken
                }
            })
            if(res.data.status == false) {
                this.$store.commit('user/remove')
                alert(res.data.msg)
            }
            this.fetchData()
            this.description = ""
            this.loading = false
        },
        async fetchData() {
            this.loading = true
            const res = await this.$axios.get(process.env.apiURL + '/comment/read/' + this.idPost)
            if(res.data.status == true) {
                this.dataComment = res.data.data.data.reverse()
                this.jmlComment = JSON.parse(JSON.stringify(res.data.data.data)).length
            }
            this.csrfToken = res.data.csrfToken
            this.loading = false
        }, 
        
        async loginGoogle() {

        }
    },

    async created() {
        await this.fetchData()
        const { dataUser } = this.$store.state.user
        this.isLogged = (dataUser.accessToken) ? true : false
        console.log('Login Google : ' + this.isLogged)
        this.$emit('emitJmlComment', this.jmlComment);
    }

})
</script>