import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestCreateWithoutPregnancyInput } from "../inputs/PregnancyTestCreateWithoutPregnancyInput";
import { PregnancyTestWhereUniqueInput } from "../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyTestCreateOrConnectWithoutPregnancyInput", {
  isAbstract: true
})
export class PregnancyTestCreateOrConnectWithoutPregnancyInput {
  @TypeGraphQL.Field(_type => PregnancyTestWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyTestWhereUniqueInput;

  @TypeGraphQL.Field(_type => PregnancyTestCreateWithoutPregnancyInput, {
    nullable: false
  })
  create!: PregnancyTestCreateWithoutPregnancyInput;
}
