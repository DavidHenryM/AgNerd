import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestScalarWhereInput } from "../inputs/PregnancyTestScalarWhereInput";
import { PregnancyTestUpdateManyMutationInput } from "../inputs/PregnancyTestUpdateManyMutationInput";

@TypeGraphQL.InputType("PregnancyTestUpdateManyWithWhereWithoutPregnancyInput", {
  isAbstract: true
})
export class PregnancyTestUpdateManyWithWhereWithoutPregnancyInput {
  @TypeGraphQL.Field(_type => PregnancyTestScalarWhereInput, {
    nullable: false
  })
  where!: PregnancyTestScalarWhereInput;

  @TypeGraphQL.Field(_type => PregnancyTestUpdateManyMutationInput, {
    nullable: false
  })
  data!: PregnancyTestUpdateManyMutationInput;
}
