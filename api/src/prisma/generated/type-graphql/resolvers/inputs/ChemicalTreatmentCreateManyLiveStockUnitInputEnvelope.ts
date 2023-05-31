import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateManyLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateManyLiveStockUnitInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope",
  {
    isAbstract: true,
  }
)
export class ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope {
  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentCreateManyLiveStockUnitInput],
    {
      nullable: false,
    }
  )
  data!: ChemicalTreatmentCreateManyLiveStockUnitInput[];
}
