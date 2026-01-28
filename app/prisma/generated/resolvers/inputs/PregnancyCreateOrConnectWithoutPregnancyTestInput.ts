import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateWithoutPregnancyTestInput } from "../inputs/PregnancyCreateWithoutPregnancyTestInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyCreateOrConnectWithoutPregnancyTestInput", {})
export class PregnancyCreateOrConnectWithoutPregnancyTestInput {
  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: false,
  })
  where!: PregnancyWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PregnancyCreateWithoutPregnancyTestInput, {
    nullable: false,
  })
  create!: PregnancyCreateWithoutPregnancyTestInput;
}
