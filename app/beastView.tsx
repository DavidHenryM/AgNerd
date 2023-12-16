"use-client"

import { DocumentNode, gql, useMutation } from "@apollo/client";
import { Card, Button, Text, Table, Tbody, Td, Tr, ButtonGroup, Editable, EditablePreview, EditableInput, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, ModalFooter, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { GiCardboardBoxClosed, GiCorkedTube, GiIceCube, GiMedicines, GiPencil, GiReceiveMoney, GiWeight } from "react-icons/gi";
import { setLivestockUnitInactiveMutation } from "./lib/mutations";

export function BeastView(props: any){
  // const [deactivate, setDeactivate] = useState(false)
  const { mutation, variables } = setLivestockUnitInactiveMutation(props.stock.id)
  const [deactivate, { loading, error, data }] = useMutation(mutation, {variables})
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false)

  let severity: any = 'info'
  let message: string = ''
 
  const handleYes = () => {
    setConfirmOpen(false)
      props.close() 
      deactivate()
  }

  const handleNo = () => {
    setConfirmOpen(false)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  
  if (data) {
    severity = 'success'
    message = 'Succesfully marked beast as inactive'
    setOpen(true)
  } else if (error) {
    severity = 'error'
    message = 'Failed to mark beast as inactive'
    setOpen(true)
  }

  


  return (
    <>
      <Card>
        <ButtonGroup spacing='2' justifyContent={'right'}>
          <Button onClick={props.edit}>
            <GiPencil/>
          </Button>
          <Button onClick={props.close}>
            <GiCardboardBoxClosed/>
          </Button>
        </ButtonGroup>
        <Table>
          <Tbody>
            <Tr>
              <Td>NLIS#</Td>
              <Td>
                <Editable 
                  defaultValue={props.stock.nlisId}
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Td>
            </Tr>
            <Tr>
              <Td>Birth date</Td>
              <Td>{props.stock.birthDate}</Td>
            </Tr>
          </Tbody>
        </Table>
        <ButtonGroup spacing='2' justifyContent={'right'}>
          <Button onClick={() => {}}  style={{width:70, height:90}}>
            <VStack>
              <GiMedicines style={{width:50, height:50}}/>  
              <Text>Treat</Text>
            </VStack>
          </Button>
          <Button onClick={() => {}}  style={{width:70, height:90}}>
            <VStack>
              <GiReceiveMoney  style={{width:50, height:50}}/>
              <Text>Sell</Text>
            </VStack>
          </Button>
          <Button onClick={() => {}}  style={{width:70, height:90}}>
            <VStack>
              <GiCorkedTube style={{width:50, height:50}}/>
              <Text>Sample</Text>
            </VStack>
          </Button>
          <Button onClick={() => {}}  style={{width:70, height:90}}>
            <VStack>
              <GiIceCube style={{width:50, height:50}}/>
              <Text>A.I.</Text>
            </VStack>
          </Button>
          <Button onClick={() => {}}  style={{width:70, height:90}}>
            <VStack>
              <GiWeight style={{width:50, height:50}}/>
              <Text>Weigh</Text>
            </VStack>
          </Button>
          <Button onClick={() => {setConfirmOpen(true)}}>
            Deactivate
          </Button>
        </ButtonGroup>
      </Card>
      <ConfirmDialog 
        open={confirmOpen} 
        handleYes={handleYes}
        handleNo={handleNo}
        text='Do you want to mark this beast as NOT active?'/>
    </>
  )
}

function ConfirmDialog(props: any) {
  return(
      <Modal
        isOpen={props.open}
        onClose={props.handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ModalOverlay />
        <ModalContent>

      <ModalHeader id="alert-dialog-title">
        {props.question}
      </ModalHeader>
        <ModalBody id="alert-dialog-description">
          {props.text}
        </ModalBody>
      <ModalFooter>
        <Button onClick={props.handleYes} autoFocus>
          Yes
        </Button>
        <Button onClick={props.handleNo}>No</Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  )
}


// function DeactivateLivestockUnit(props: {stock: any} ) {
//   console.log('deactivating')
  

//   const [open, setOpen] = useState(false);

//   let severity: any = 'info'
//   let message: string = ''
 

//   const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

  
//   if (data) {
//     severity = 'success'
//     message = 'Succesfully marked beast as inactive'
//     setOpen(true)
//   } else if (error) {
//     severity = 'error'
//     message = 'Failed to mark beast as inactive'
//     setOpen(true)
//   } else if(loading) {
//     return (<CircularProgress/>)
//   }
//     return (
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
//           {message}
//         </Alert>
//     </Snackbar>
//     )
// }


