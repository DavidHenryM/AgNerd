import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyScalarWhereInput } from "../inputs/PregnancyScalarWhereInput";
import { PregnancyUpdateManyMutationInput } from "../inputs/PregnancyUpdateManyMutationInput";

@TypeGraphQL.InputType("PregnancyUpdateManyWithWhereWithoutParentsInput", {
  isAbstract: true,
})
export class PregnancyUpdateManyWithWhereWithoutParentsInput {
  @TypeGraphQL.Field((_type) => PregnancyScalarWhereInput, {
    nullable: false,
  })
  where!: PregnancyScalarWhereInput;

  @TypeGraphQL.Field((_type) => PregnancyUpdateManyMutationInput, {
    nullable: false,
  })
  data!: PregnancyUpdateManyMutationInput;
}
