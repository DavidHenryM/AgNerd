import {  Dispatch, SetStateAction, useState } from "react"
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

export default function ControlBar(
  props: {
    filterChecked: Array<boolean>, 
    setFilterChecked: Dispatch<SetStateAction<Array<boolean>>>
    openFilter: boolean,
    setOpenFilter: Dispatch<SetStateAction<boolean>>
  }) {
  const [openCreateNew, setOpenCreateNew] = useState(false)
  
  const [openSort, setOpenSort] = useState(false)


  return (
    <ActionBarRoot open={true} >
      <ActionBarContent bg="teal.900">
        <Group gap={'20px'}>
          <Button onClick={()=>setOpenCreateNew(true)}>
            <Icons.HiPlus/>
          </Button>
          <ActionBarSeparator />
          <Button onClick={()=>props.setOpenFilter(true)}>
            <Icons.HiFilter/>
          </Button>
          <ActionBarSeparator />
          <Button onClick={()=>setOpenSort(true)}>
            <Icons.HiSwitchVertical/>
          </Button>
        </Group>
      </ActionBarContent>
      <SortBeastsDrawer open={openSort} setOpen={setOpenSort}/>
      <FilterBeastsDrawer open={props.openFilter} setOpen={props.setOpenFilter} checked={props.filterChecked} setChecked={props.setFilterChecked}/>
      <CreateNewBeastDrawer open={openCreateNew} setOpen={setOpenCreateNew}/>
      </ActionBarRoot>
  )
}