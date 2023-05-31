import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateNestedOneWithoutTreatmentInput } from "../inputs/ChemicalProductCreateNestedOneWithoutTreatmentInput";
import { LivestockUnitCreateNestedOneWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateNestedOneWithoutTreatmentsInput";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.InputType("ChemicalTreatmentCreateInput", {
  isAbstract: true,
})
export class ChemicalTreatmentCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  treatmentDate!: Date;

  @TypeGraphQL.Field((_type) => ApplicationMethod, {
    nullable: false,
  })
  applicationMethod!:
    | "ORAL"
    | "TRANSDERMAL"
    | "SUB_CUT_INJECTION"
    | "INTRAVENUS_INJECTION";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  volume_ml!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  witholdingPeriodDays?: number | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateNestedOneWithoutTreatmentsInput,
    {
      nullable: false,
    }
  )
  liveStockUnit!: LivestockUnitCreateNestedOneWithoutTreatmentsInput;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateNestedOneWithoutTreatmentInput,
    {
      nullable: true,
    }
  )
  product?: ChemicalProductCreateNestedOneWithoutTreatmentInput | undefined;
}
