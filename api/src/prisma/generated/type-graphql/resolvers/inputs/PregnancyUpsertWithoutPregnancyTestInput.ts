import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateWithoutPregnancyTestInput } from "../inputs/PregnancyCreateWithoutPregnancyTestInput";
import { PregnancyUpdateWithoutPregnancyTestInput } from "../inputs/PregnancyUpdateWithoutPregnancyTestInput";

@TypeGraphQL.InputType("PregnancyUpsertWithoutPregnancyTestInput", {
  isAbstract: true
})
export class PregnancyUpsertWithoutPregnancyTestInput {
  @TypeGraphQL.Field(_type => PregnancyUpdateWithoutPregnancyTestInput, {
    nullable: false
  })
  update!: PregnancyUpdateWithoutPregnancyTestInput;

  @TypeGraphQL.Field(_type => PregnancyCreateWithoutPregnancyTestInput, {
    nullable: false
  })
  create!: PregnancyCreateWithoutPregnancyTestInput;
}
