<template>
    <div class="grid-cols-1 max-w-xl gap-8 px-4 mx-auto md:px-6 lg:px-8">
        <NavBar />
        <div v-if="isLogged == true" class="transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-opacity-50 text-right mb-2 rounded-lg mt-5">
            <span @click="btnLogout" class="text-red-500 text-xl cursor-pointer text-right font-bold">Log Out </span>           
        </div>        
        <div v-if="isLogged == true" class="transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md mb-2 rounded-lg mt-5">
            <label class="block">
                <span class="text-gray-700 dark:text-white font-bold">Author: </span>
                <input v-model="author" class="form-textarea text-black rounded p-3 mt-1 block w-full" placeholder="Masukan author..." />
            </label>            
        </div>        
        <div v-if="isLogged == true" class="transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
            <div v-for="(n, index) in form" :key="index" class="py-2">
                <label class="block">
                    <span class="text-gray-700 dark:text-white font-bold">Description</span>
                    <textarea v-model="form[index].text" class="form-textarea text-black rounded p-5 mt-1 block w-full" rows="6" placeholder="Enter Description here..."></textarea>
                </label>
                <span class="text-gray-700 dark:text-white font-bold w-full">Image URL</span>
                <div class="flex">
                    <input v-model="form[index].img" class="rounded text-black p-2 mt-1 block w-full" />
                </div>
            </div>
            <button @click="addBreak" class="bg-red-500 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Add Break
            </button>                              
        </div>
        <div v-if="isLogged == true" class="transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg mt-2">
            <label class="block">
                <span class="text-gray-700 dark:text-white font-bold">Sumber: </span>
                <input v-model="sumber" class="form-textarea text-black rounded p-3 mt-1 block w-full" placeholder="Masukan sumber..." />
            </label>            
        </div>
        <label v-if="isLogged == true && dataLogin.data.email == 'septiandwianugrah@gmail.com'" class="inline-flex items-center mt-3">
            <input type="checkbox" v-model="headline" class="form-checkbox h-5 w-5 text-gray-600" checked><span class="ml-2 dark:text-white text-gray-700">Set as Headline?</span>
        </label>        
        <button v-if="isLogged == true" @click="submit" class="bg-green-500 mt-5 w-full hover:bg-blue-dark text-white font-bold py-5 text-xl px-4 mb-5 rounded">
            Submit
        </button>         
        <GoogleLogin v-if="isLogged == false" class="bg-green-500 mt-5 w-full hover:bg-blue-dark text-white font-bold py-3 text-xl px-4 rounded" :params="params" :onSuccess="onSuccess" :onFailure="onFailure" :onCurrentUser="onCurrentUser">Login Dulu!</GoogleLogin>    
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import GoogleLogin from 'vue-google-login';

export default Vue.extend({
    data: () => {
        const data: {
            form: any[],
            isLogged: boolean,
            headline: any,
            sumber: string,    
            params: object,
            author: string,
            dataLogin: any
        } = {
            form: [],
            author: '',
            isLogged: false,
            sumber: '',
            headline: '',
            dataLogin: [],
            params: {
                client_id: "55513693753-626nnc1r1g0ti3d5qp4l9c2jiihc44d7.apps.googleusercontent.com"
            },            
        }
        return data
    },
    components: {
        GoogleLogin
    },    
    computed: {
    },
    methods: {
        addBreak: function() {
            console.log('asd')
            this.form.push({value : ''})
        },
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
            location.reload()
        },
        onFailure: function() {
            alert('Gagal mengambil data!')
        },
        onCurrentUser: function(user: any) {

        },
        btnLogout: function() {
            this.$store.commit('user/remove')
            location.reload()
        },
        submit: async function() {
            const { dataUser } = this.$store.state.user
            let data:any = []

            this.form = JSON.parse(JSON.stringify(this.form))

            this.form.forEach((item, index) => {
                data.push({
                    text: item.text,
                    img: [item.img]
                })
            })
            let dataKirim = {
                linkAuthor: this.sumber,
                username: this.author,
                title: this.form[0].text,
                headline: this.headline,
                data: data,
            }
            console.log(dataKirim)
            const res = await this.$axios.post(process.env.apiURL + '/kisah/add/', dataKirim, {                                           
                headers: { 
                    'withCredentials': false, 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization' : 'Bearer ' + dataUser.accessToken
                }
            }) 
            if(res.data.status == true) {
                alert('Artikel berhasil di input!')
            } else {
                alert('Terjadi kesalahan!')
            }
            this.form = []
            this.form.push({text : ''})
        }
    },
    async created() {
        this.form.push({text : ''})
        const { dataUser } = this.$store.state.user
        this.dataLogin = dataUser
        this.isLogged = (dataUser.accessToken) ? true : false        
    }
})
</script>