import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutSireInput } from "../inputs/LivestockUnitUpdateWithoutSireInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateWithWhereUniqueWithoutSireInput", {})
export class LivestockUnitUpdateWithWhereUniqueWithoutSireInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutSireInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutSireInput;
}
