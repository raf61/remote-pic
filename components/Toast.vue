<template>
    <div class="absolute z-10 w-full max-w-[20rem] right-10 top-10 select-none">

        <transition-group name="toast"
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="leave"
        >

            <div v-for="(key) in messageKeys" :key="key" class="mb-3">
                <div class="p-3 text-white rounded text-center flex justify-around items-center" :style="`background-color: ${messages[key].color}`">
                    <p class="text-md">{{ messages[key].msg }}</p>
                    <span class="cursor-pointer" @click="handleCloseButton(key)">
                        <span class="bg-black rounded-full p-1 flex items-center justify-center" @click="handleCancelUploadButton">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-center text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </span>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import gsap from 'gsap'

const messages = useState('toast-messages', () => ({}))
const messageKeys = computed(() => Object.keys(messages.value))
const beforeEnter = (el) => {
    el.style.transform = 'translateY(-60px)'
    el.style.opacity = 0
}
const enter = (el) => {
    gsap.to(el, {
        y:0,
        opacity:1,
    })
}

const leave = (el) => {
    el.style.transform = 'translateY(-60px)'
}

const handleCloseButton = (key) => {
    toast().remove(key)
}
</script>

<style scoped>

</style>