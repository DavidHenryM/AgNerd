import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutMobInput } from "../inputs/LivestockUnitUpdateWithoutMobInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateWithWhereUniqueWithoutMobInput", {
  isAbstract: true,
})
export class LivestockUnitUpdateWithWhereUniqueWithoutMobInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutMobInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutMobInput;
}
