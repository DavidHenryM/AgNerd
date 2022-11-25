import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateWithoutPaddockInput } from "../inputs/GrazeCreateWithoutPaddockInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeCreateOrConnectWithoutPaddockInput", {
  isAbstract: true
})
export class GrazeCreateOrConnectWithoutPaddockInput {
  @TypeGraphQL.Field(_type => GrazeWhereUniqueInput, {
    nullable: false
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field(_type => GrazeCreateWithoutPaddockInput, {
    nullable: false
  })
  create!: GrazeCreateWithoutPaddockInput;
}
