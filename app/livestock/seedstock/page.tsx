"use client"

import SidebarWithHeader from "../../components/SideBar";
import LivestockCardsScreen from "@/app/components/screens/LiveStockCards";

export default function Livestock(){
  const filter = {active: {equals: true}, commercialClass: {equals: "SEEDSTOCK"}}
  return (
    <SidebarWithHeader>
      <LivestockCardsScreen whereFilter={filter}/>
    </SidebarWithHeader>
  )
}