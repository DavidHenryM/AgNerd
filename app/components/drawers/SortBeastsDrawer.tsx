import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerHeader, DrawerRoot } from "@/components/ui/drawer"
import { Dispatch, SetStateAction } from "react"

export default function SortBeastsDrawer(props: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}){
  return (
    <DrawerRoot
      open={props.open}
      onOpenChange={(event: any)=>props.setOpen(event.open)}
      placement='top'>
      <DrawerBackdrop/>
        <DrawerContent bg='blackAlpha.900'>
          <DrawerCloseTrigger />
          <DrawerHeader>Sort</DrawerHeader>
          <DrawerBody>
          </DrawerBody>
        </DrawerContent>
    </DrawerRoot>
  )
}