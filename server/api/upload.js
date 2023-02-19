import { v4 } from 'uuid'
import { extname } from 'path'
import formidablePromise from "../utils/customFormidable";
import { Readable } from 'stream'
import uploadFile from '../utils/googleDriveUploadFile'

const formidableConfig = {
  keepExtensions: true,
  allowEmptyFiles: false,
  multiples: false,
};


export default defineEventHandler(async event => {

    const req = event.node.req
    if(req.method != 'POST'){
      return sendNoContent(event, 405)
    }
    const chunks = [];
    
    const { files:{upload:uploaded} } = await formidablePromise(req, chunks, {
      ...formidableConfig,
    });  
    

  
    const contents = Buffer.concat(chunks);

    const uploadedFileId = await uploadFile(v4()+extname(uploaded.originalFilename), Readable.from(contents), uploaded.mimetype)
    if (!uploadedFileId){
      return {
        ok:false,
        msg:"Could not upload file 😓"
      }
    }
    return {
      ok:true
    }
})
