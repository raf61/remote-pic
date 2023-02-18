import formidable from "formidable";
import { Writable } from "stream";




  const fileConsumer = (acc) => {
    const writable = new Writable({
      write: (chunk, _enc, next) => {
        acc.push(chunk);
        next();
      },
    });
  
    return writable;
  };

  export default function formidablePromise(req, chunks, opts) {
    return new Promise((accept, reject) => {
      const form = formidable({
        ...opts,
        fileWriteStreamHandler: () => fileConsumer(chunks)
      });
      return accept({ a:true })
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        return accept({ fields, files });
      });
    });
  }
  
