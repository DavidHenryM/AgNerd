'use client'

import { FarmCard } from "../components/FarmCard";
import SidebarWithHeader from "../components/SideBar";

export default function Farm(){
  return (
    <SidebarWithHeader Content={FarmCard}></SidebarWithHeader>
  )
}