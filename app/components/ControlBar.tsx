import {  useState } from "react"
import { Group } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Icons } from "../lib/Icons"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "@/components/ui/action-bar"
import CreateNewBeastDrawer from "./drawers/CreateNewBeastDrawer"
import FilterBeastsDrawer from "./drawers/FilterBeastsDrawer"
import SortBeastsDrawer from "./drawers/SortBeastsDrawer"

export default function ControlBar() {
  const [openCreateNew, setOpenCreateNew] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openSort, setOpenSort] = useState(false)

  return (
    
    <ActionBarRoot open={true} >
    <ActionBarContent bg="teal.900">

        <Group gap={'20px'}>
          <Button onClick={()=>setOpenCreateNew(true)}>
            <Icons.HiPlus/>
          </Button>
          <ActionBarSeparator />
          <Button onClick={()=>setOpenFilter(true)}>
            <Icons.HiFilter/>
          </Button>
          <ActionBarSeparator />
          <Button onClick={()=>setOpenSort(true)}>
            <Icons.HiSwitchVertical/>
          </Button>
        </Group>
</ActionBarContent>
      <SortBeastsDrawer open={openSort} setOpen={setOpenSort}/>
      <FilterBeastsDrawer open={openFilter} setOpen={setOpenFilter} />
      <CreateNewBeastDrawer open={openCreateNew} setOpen={setOpenCreateNew}/>
      </ActionBarRoot>
  )
}