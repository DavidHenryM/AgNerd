"use-client"

import { DocumentNode, gql, useMutation } from "@apollo/client";
import { Card, Button, ScaleFade, Table, Tbody, Td, Tr, ButtonGroup, Editable, EditablePreview, EditableInput } from "@chakra-ui/react"
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useState } from "react";
import { GiCardboardBoxClosed, GiPencil } from "react-icons/gi";
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
    // <ScaleFade initialScale={0.1}>
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
        <Button onClick={() => {setConfirmOpen(true)}}>
          Deactivate
        </Button>
      </Card>
      <ConfirmDialog 
        open={confirmOpen} 
        handleYes={handleYes}
        handleNo={handleNo}/>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar> */}
    </>
    // </ScaleFade>     
  )
}

function ConfirmDialog(props: any) {
  return(
      <Dialog
        open={props.open}
        onClose={props.handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {props.question}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleNo}>No</Button>
        <Button onClick={props.handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}


function DeactivateLivestockUnit(props: {stock: any} ) {
  console.log('deactivating')
  

  const [open, setOpen] = useState(false);

  let severity: any = 'info'
  let message: string = ''
 

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
  } else if(loading) {
    return (<CircularProgress/>)
  }
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
    </Snackbar>
    )
}


