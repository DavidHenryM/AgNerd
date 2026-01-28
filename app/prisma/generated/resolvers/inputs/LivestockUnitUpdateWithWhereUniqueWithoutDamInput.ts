import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutDamInput } from "../inputs/LivestockUnitUpdateWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateWithWhereUniqueWithoutDamInput", {})
export class LivestockUnitUpdateWithWhereUniqueWithoutDamInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutDamInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutDamInput;
}
