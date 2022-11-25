import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutMobInput } from "../inputs/LivestockUnitCreateWithoutMobInput";
import { LivestockUnitUpdateWithoutMobInput } from "../inputs/LivestockUnitUpdateWithoutMobInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithWhereUniqueWithoutMobInput", {
  isAbstract: true
})
export class LivestockUnitUpsertWithWhereUniqueWithoutMobInput {
  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateWithoutMobInput, {
    nullable: false
  })
  update!: LivestockUnitUpdateWithoutMobInput;

  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutMobInput, {
    nullable: false
  })
  create!: LivestockUnitCreateWithoutMobInput;
}
