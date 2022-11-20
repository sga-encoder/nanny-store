import { toast } from 'react-hot-toast'
export const toastify = (messages, type) => {
  switch (type) {
    case 'success':
      toast.success(messages,
        {
          // icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        }
      )
      break
    case 'error':
      toast.error(messages,
        {
          // icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
          }
        }
      )
      break
  }
}
