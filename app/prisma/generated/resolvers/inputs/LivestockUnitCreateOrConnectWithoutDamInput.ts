import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateOrConnectWithoutDamInput", {})
export class LivestockUnitCreateOrConnectWithoutDamInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutDamInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutDamInput;
}
