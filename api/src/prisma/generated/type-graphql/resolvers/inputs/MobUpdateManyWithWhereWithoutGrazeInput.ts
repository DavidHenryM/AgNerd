import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobScalarWhereInput } from "../inputs/MobScalarWhereInput";
import { MobUpdateManyMutationInput } from "../inputs/MobUpdateManyMutationInput";

@TypeGraphQL.InputType("MobUpdateManyWithWhereWithoutGrazeInput", {
  isAbstract: true,
})
export class MobUpdateManyWithWhereWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => MobScalarWhereInput, {
    nullable: false,
  })
  where!: MobScalarWhereInput;

  @TypeGraphQL.Field((_type) => MobUpdateManyMutationInput, {
    nullable: false,
  })
  data!: MobUpdateManyMutationInput;
}
