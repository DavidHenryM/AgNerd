'use client'

import { FarmCard } from "../components/cards/FarmCard";
import SidebarWithHeader from "../components/SideBar";

export default function Farm(){
  return (
    <SidebarWithHeader>
      <FarmCard />
    </SidebarWithHeader>
  )
}