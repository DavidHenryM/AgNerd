// import { ApolloError } from "@apollo/client"
import { useToast } from "@chakra-ui/react"

export default function SuccessAlert(props: {operation: string, loading: boolean, error: ApolloError | undefined, data: any}){
    const toast = useToast()
    if (props.data) {     
      toast.closeAll()
      return (
        toast(
          {
            title: `${props.operation} succesful`,
            description: props.operation,
            status: 'success',
            duration: 9000,
            isClosable: true,
          }
        )
      )
    } else if (props.loading) {
      toast.closeAll()
      return (
        toast(
          {
            title: `Working on ${props.operation.toLowerCase()}`,
            description: "We've created your account for you.",
            status: 'loading',
            duration: 9000,
            isClosable: true,
          }
        )
      )
    } else if (props.error) {
      toast.closeAll()
      return (
        toast(
          {
            title: `Ran into a problem whilst ${props.operation.toLowerCase()}`,
            description: props.error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          }
        )
      )
    }
  }