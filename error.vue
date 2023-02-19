<template>
    <div class="w-full h-[90vh] flex justify-center items-center text-white">
        <div class="max-w-sm mx-auto text-center">
            <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
            <p class="text-6xl">Ooops.</p>
            <p class="mt-7">{{ error.message }}</p>
            <button class="btn my-7 underline" @click="handleClearError">Go Home ...</button>
        </div>
    </div>
</template>

<script setup>


const {error} = defineProps({
    error:Object
})

const handleClearError = () => clearError({
    redirect:'/'
})

useHead({
    title:error.message,
    bodyAttrs:{
        class:'bg-custom-gray'
    }
})

</script>
