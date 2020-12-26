<template>
    <div class="h-screen grid-cols-1 max-w-xl gap-8 px-4 mx-auto md:px-6 lg:px-8">
        <NavBar />
        <div class="transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg">
            <div v-for="(n, index) in form" :key="index" class="py-2">
                <label class="block">
                    <span class="text-gray-700 dark:text-white font-bold">Description</span>
                    <textarea v-model="form[index].value" class="form-textarea rounded p-5 mt-1 block w-full" rows="3" placeholder="Enter Description here..."></textarea>
                </label>
                <span class="text-gray-700 dark:text-white font-bold w-full">Image URL</span>
                <div class="flex">
                    <input class="rounded p-2 mt-1 block w-3/4" />
                    <button class="mt-1 block w-1/4 bg-green-500 text-white rounded ml-5">+</button>
                </div>
            </div>
            <button @click="addBreak" class="bg-red-500 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Add Break
            </button>                              
        </div>
        <div class="transition delay-150 duration-300 ease-in-out px-4 py-4 dark:bg-gray-800 dark:bg-opacity-50 bg-white shadow-md rounded-lg mt-5">
            <label class="block">
                <span class="text-gray-700 dark:text-white font-bold">Sumber: </span>
                <input v-model="sumber" class="form-textarea rounded p-5 mt-1 block w-full" placeholder="Masukan sumber..." />
            </label>            
        </div>
        <button @click="submit" class="bg-green-500 mt-5 w-full hover:bg-blue-dark text-white font-bold py-5 text-xl px-4 rounded">
            Submit
        </button>         
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => {
        const data: {
            form: any[],
            sumber: string,        
        } = {
            form: [],
            sumber: ''
        }
        return data
    },
    computed: {
    },
    methods: {
        addBreak: function() {
            console.log('asd')
            this.form.push({value : ''})
        },
        submit: function() {
            console.log(this.form)
        }
    },
    created() {
        this.form.push({value : ''})
    }
})
</script>