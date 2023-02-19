import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
    credentials:{
      client_email: useRuntimeConfig().googleDriveClientEmail,
      private_key: useRuntimeConfig().googleDrivePrivateKey
    },
    scopes: ['https://www.googleapis.com/auth/drive']
})

export default async function googleDriveUploadFile(filename, contents, mimeType='image/jpg'){
    try {

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            name: filename,
            parents: [useRuntimeConfig().googleDriveFolderId]
        }

        const media = { 
            mimeType: mimeType,
            body: contents
        }
        const response = await driveService.files.create({
            resource: fileMetaData,
            media,
            fields: 'id'
        })


        return response.data.id

    } catch (err) {
        return false
    }
}

