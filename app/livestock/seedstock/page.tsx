"use client"

import LivestockCardsScreen from "@/app/components/screens/LiveStockCards";
import { CommercialClass } from "@/app/generated/prisma/client";

export default function Livestock(){
  const filter = {active: {equals: true}, commercialClass: {equals: "SEEDSTOCK" as CommercialClass}}
  return (
    <>
      <LivestockCardsScreen whereFilter={filter}/>
    </>
  )
}