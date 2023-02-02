import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateWithoutLocationInput";
import { LivestockUnitPositionWhereUniqueInput } from "../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitPositionCreateOrConnectWithoutLocationInput", {
  isAbstract: true
})
export class LivestockUnitPositionCreateOrConnectWithoutLocationInput {
  @TypeGraphQL.Field(_type => LivestockUnitPositionWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitPositionWhereUniqueInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionCreateWithoutLocationInput, {
    nullable: false
  })
  create!: LivestockUnitPositionCreateWithoutLocationInput;
}
