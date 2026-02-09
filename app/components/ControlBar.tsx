import {  Dispatch, SetStateAction, useState } from "react"
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { Icons } from "@lib/Icons"
import CreateNewBeastDialogue from "@components/dialogues/CreateNewBeastDialogue"
import FilterBeastsDialogue from "@components/dialogues/FilterBeastsDialogue"
import SortBeastsDialogue from "@components/dialogues/SortBeastsDialogue"




export default function ControlBar(
  props: {
    filterChecked: Array<boolean>, 
    setFilterChecked: Dispatch<SetStateAction<Array<boolean>>>
    openFilter: boolean,
    setOpenFilter: Dispatch<SetStateAction<boolean>>
    onFarmOnly: boolean
    setOnFarmOnly: Dispatch<SetStateAction<boolean>>
  }) {
  const [openCreateNew, setOpenCreateNew] = useState(false)
  
  const [openSort, setOpenSort] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
              key={"New"}
              icon={<Icons.HiPlus/>}
              slotProps={{
                tooltip: {
                  title: "New",
                },
              }}
              onClick={()=>setOpenCreateNew(true)}
            />
            <SpeedDialAction
              key={"Filter"}
              icon={<Icons.HiFilter/>}
              slotProps={{
                tooltip: {
                  title: "Filter",
                },
              }}
              onClick={()=>props.setOpenFilter(true)}
            />
            <SpeedDialAction
              key={"Sort"}
              icon={<Icons.HiSwitchVertical/>}
              slotProps={{
                tooltip: {
                  title: "Sort",
                },
              }}
              onClick={()=>setOpenSort(true)}
            />
        </SpeedDial>
      </Box>
      <SortBeastsDialogue open={openSort} setOpen={setOpenSort}/>
      <FilterBeastsDialogue
        open={props.openFilter}
        setOpen={props.setOpenFilter}
        checked={props.filterChecked}
        setChecked={props.setFilterChecked}
        onFarmOnly={props.onFarmOnly}
        setOnFarmOnly={props.setOnFarmOnly}
      />
      <CreateNewBeastDialogue open={openCreateNew} setOpen={setOpenCreateNew}/>
    </>
  )



}