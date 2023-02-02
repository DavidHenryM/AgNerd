import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestUpdateWithoutPregnancyInput } from "../inputs/PregnancyTestUpdateWithoutPregnancyInput";
import { PregnancyTestWhereUniqueInput } from "../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput", {
  isAbstract: true
})
export class PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput {
  @TypeGraphQL.Field(_type => PregnancyTestWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyTestWhereUniqueInput;

  @TypeGraphQL.Field(_type => PregnancyTestUpdateWithoutPregnancyInput, {
    nullable: false
  })
  data!: PregnancyTestUpdateWithoutPregnancyInput;
}
