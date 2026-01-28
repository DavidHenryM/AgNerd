import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutTreatmentsInput } from "../inputs/LivestockUnitUpdateWithoutTreatmentsInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateToOneWithWhereWithoutTreatmentsInput",
  {},
)
export class LivestockUnitUpdateToOneWithWhereWithoutTreatmentsInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutTreatmentsInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutTreatmentsInput;
}
