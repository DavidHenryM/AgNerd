import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

export function ConfirmDialog(props: {
  open: boolean,
  question: string,
  text: string,
  handleYes: () => void,
  handleNo: () => void
}) {
  return(
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{props.question}</DialogTitle>
      <DialogContent>
          {props.text}
      </DialogContent>
        <DialogActions>
          <Stack direction="row" gap={2}>
            <Button onClick={props.handleYes} autoFocus>
              Yes
            </Button>
            <Button onClick={props.handleNo}>
              No
            </Button>
          </Stack>
        </DialogActions>
    </Dialog>
  )
}