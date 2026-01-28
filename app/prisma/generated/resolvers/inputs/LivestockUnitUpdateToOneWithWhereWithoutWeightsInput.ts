import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutWeightsInput } from "../inputs/LivestockUnitUpdateWithoutWeightsInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateToOneWithWhereWithoutWeightsInput",
  {},
)
export class LivestockUnitUpdateToOneWithWhereWithoutWeightsInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutWeightsInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutWeightsInput;
}
