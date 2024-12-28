import { Toaster, toaster } from "@/components/ui/toaster"

export default function SuccessAlert(props: {operation: string, loading: boolean, error: String | undefined, data: any}){
    if (props.data) {     
      toaster.dismiss()
      toaster.create(
        {
          title: `${props.operation} succesful`,
          description: props.operation,
          type: 'success',
          duration: 9000,
        }
      )
      return (
        <Toaster/>
      )
    } else if (props.loading) {
      toaster.dismiss()
      toaster.create(
        {
          title: `Working on ${props.operation.toLowerCase()}`,
          description: "We've created your account for you.",
          type: 'loading',
          duration: 9000,
        }
      )
      return (
        <Toaster/>
      )
    } else if (props.error) {
      toaster.dismiss()
      toaster.create(
        {
          title: `Ran into a problem whilst ${props.operation.toLowerCase()}`,
          description: props.error,
          type: 'error',
          duration: 9000,
        }
      )
      return (
        <Toaster/>
      )
    }
  }