import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateWithoutMobInput } from "../inputs/GrazeCreateWithoutMobInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeCreateOrConnectWithoutMobInput", {})
export class GrazeCreateOrConnectWithoutMobInput {
  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: false,
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GrazeCreateWithoutMobInput, {
    nullable: false,
  })
  create!: GrazeCreateWithoutMobInput;
}
