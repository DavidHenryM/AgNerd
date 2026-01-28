import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestCreateWithoutPregnancyInput } from "../inputs/PregnancyTestCreateWithoutPregnancyInput";
import { PregnancyTestUpdateWithoutPregnancyInput } from "../inputs/PregnancyTestUpdateWithoutPregnancyInput";
import { PregnancyTestWhereUniqueInput } from "../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.InputType(
  "PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput",
  {},
)
export class PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => PregnancyTestWhereUniqueInput, {
    nullable: false,
  })
  where!: PregnancyTestWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PregnancyTestUpdateWithoutPregnancyInput, {
    nullable: false,
  })
  update!: PregnancyTestUpdateWithoutPregnancyInput;

  @TypeGraphQL.Field((_type) => PregnancyTestCreateWithoutPregnancyInput, {
    nullable: false,
  })
  create!: PregnancyTestCreateWithoutPregnancyInput;
}
