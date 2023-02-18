// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css:[
        '~/assets/css/style.css'
    ],
    modules: ['@nuxtjs/tailwindcss'],
    runtimeConfig:{
        googleDriveClientEmail: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        googleDrivePrivateKey: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID
    },
})
