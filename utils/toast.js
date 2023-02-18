import {v4} from 'uuid'
export default function (){
    const messages = useState('toast-messages', () => ({}))

    const showToast = (msg, color, opts) => {
        let id = v4()
        messages.value[id] = { msg, color }
        messages.value[id]['timeout'] = setTimeout(() => {
            Reflect.deleteProperty(messages.value, id)
        }, opts.duration ?? 4000)
    }

    return {
        success(msg, opts={}){
           showToast(msg, "#5EBA7D", opts)
        },
        error(msg, opts={}){
            showToast(msg, "#e83f3f", opts)
        },
        remove(id){
            clearTimeout(messages.value[id]['timeout'])
            Reflect.deleteProperty(messages.value, id)
        }
    }
}