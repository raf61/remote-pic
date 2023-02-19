<template>
    <Head>
        <title>Photo Uploader</title>
    </Head>
    <Toast />
    <main class="flex justify-center items-center min-h-[100vh] pb-20">
        <form name="" method="post" @submit.prevent class="select-none">
            <div class="max-w-2xl px-5 block">
                <input @input="handleUploadInput($event)" ref="uploadInput" accept="image/*" type="file" hidden name="upload" id="upload" />
                <div v-if="!chosenFile">
                    <label for="upload" class="table">
                        <div class="bg-white flex gap-3 px-5 py-3 rounded cursor-pointer">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </span>
                            <span>Choose Photo</span>
                        </div>
                    </label>
                </div>
                <div v-else class="select-none">
                    <div class="flex justify-center rounded relative ">
                        <div class="max-w-[15rem] lg:max-w-[20rem] relative">
                            <span v-if="!currentlyUploading" class="absolute bg-black rounded-full cursor-pointer p-2 md:p-1 top-[-10px] right-[-10px] flex items-center justify-center" @click="handleCancelUploadButton">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-center text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                            <img :src="chosenFileB64" class="w-full border" alt="">
                        </div>
                    </div>
                    <div class="flex justify-center mt-5" v-if="currentlyUploading">
                        <Loader :size="60" />
                    </div>
                    <div class="mt-5 text-white flex justify-center" v-else>
                        <div class="w-full flex justify-center">
                            <button ref="uploadButton" @click="handleUploadButton" class="flex items-center justify-center w-[13rem] bg-blue-600 transition duration-500 rounded-full cursor-pointer text-center px-2 py-3 md:py-2 border-2s border-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span class="font-bold text-sm">Upload</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </main>
</template>

<script setup>
    useHead({
        bodyAttrs:{
            class:'bg-custom-gray'
        }
    })
    const chosenFile = ref(null)
    const uploadButton = ref()
    const uploadInput = ref()
    const currentlyUploading = ref(false)
    
    const handleUploadInput = async (event) => {
        let filelist = event.target.files
        if (!filelist.length){
            return
        }
        chosenFile.value = filelist[0]
        await nextTick()
        uploadInput.value.type = 'text'
        uploadInput.value.type = 'file'
    }

    const chosenFileB64 = computed(() => {
        if (!chosenFile.value)
            return null
        return (URL.createObjectURL(chosenFile.value))
    })

    const handleCancelUploadButton = () => {
        chosenFile.value = null
    }

    const handleUploadButton = async () => {
        if (!chosenFile.value){
            return
        }
        const formdata = new FormData()
        formdata.append('upload', chosenFile.value)
        try{

            currentlyUploading.value = true
            const result = await $fetch('/api/upload', {
                body:formdata,
                method:'POST',
            })
            if (!result.ok){
                return toast().error(result.msg ?? 'Something went wrong 😓')
            }
            chosenFile.value = false
            return toast().success('Your photo has been uploaded 😀')
        }
        catch(err){
            return toast().error('Something went wrong 😓')
        }
        finally{
            currentlyUploading.value = false
        }
    }

</script>
