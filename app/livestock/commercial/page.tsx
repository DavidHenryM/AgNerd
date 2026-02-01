"use client"

import LivestockCardsScreen from "@/app/components/screens/LiveStockCards";
import { CommercialClass } from "@/app/generated/prisma/enums";

export default function Livestock(){
  const filter = {active: {equals: true}, commercialClass: {equals: "COMMERCIAL" as CommercialClass}}
  return (
    <>
      <LivestockCardsScreen whereFilter={filter}/>
    </>
  )
}