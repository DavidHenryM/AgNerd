import { Dispatch, SetStateAction } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

export default function SortBeastsDialogue(props: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}){
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Sort</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2">
          Sorting options will appear here.
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