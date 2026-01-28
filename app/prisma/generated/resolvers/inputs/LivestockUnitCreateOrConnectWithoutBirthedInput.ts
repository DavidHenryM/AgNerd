import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutBirthedInput } from "../inputs/LivestockUnitCreateWithoutBirthedInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateOrConnectWithoutBirthedInput", {})
export class LivestockUnitCreateOrConnectWithoutBirthedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutBirthedInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutBirthedInput;
}
