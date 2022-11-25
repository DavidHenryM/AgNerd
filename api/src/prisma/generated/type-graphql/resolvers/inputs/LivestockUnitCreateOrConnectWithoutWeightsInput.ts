import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutWeightsInput } from "../inputs/LivestockUnitCreateWithoutWeightsInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateOrConnectWithoutWeightsInput", {
  isAbstract: true
})
export class LivestockUnitCreateOrConnectWithoutWeightsInput {
  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutWeightsInput, {
    nullable: false
  })
  create!: LivestockUnitCreateWithoutWeightsInput;
}
