import { Dispatch, SetStateAction } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"


export default function TreatmentDialogue(props: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}){
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Record treatment</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2">
          Form fields will appear here.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => props.setOpen(false)}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}