# Remote picture uploader

#### Imagine meeting your biggest idol and wanting to take a picture of you two, but your phone is out of battery. What can you do ? -> Ask him/her to take the selfie and send it to your remote picture uploader. The picture will go directly into your google drive!

## Usage
In order to configure your picture uploader for sending images to google drive, you must have service account credentials in google console ( client email and private key ) and your google drive folder ID. More details about it here: https://www.labnol.org/google-api-service-account-220404


After that, you can populate your .env file following .env.example, and than, deploy the project.

Run ```pnpm i```

If you just want to test, run ```pnpm run dev``` .


But if you want to deploy, run  ```pnpm run build``` to build the application and than configure a server. 

Or, alternatively, you could use a service like Vercel to deploy your app for free.



