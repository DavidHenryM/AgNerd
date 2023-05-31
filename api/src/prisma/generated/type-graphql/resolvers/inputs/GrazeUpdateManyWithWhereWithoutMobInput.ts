import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeScalarWhereInput } from "../inputs/GrazeScalarWhereInput";
import { GrazeUpdateManyMutationInput } from "../inputs/GrazeUpdateManyMutationInput";

@TypeGraphQL.InputType("GrazeUpdateManyWithWhereWithoutMobInput", {
  isAbstract: true,
})
export class GrazeUpdateManyWithWhereWithoutMobInput {
  @TypeGraphQL.Field((_type) => GrazeScalarWhereInput, {
    nullable: false,
  })
  where!: GrazeScalarWhereInput;

  @TypeGraphQL.Field((_type) => GrazeUpdateManyMutationInput, {
    nullable: false,
  })
  data!: GrazeUpdateManyMutationInput;
}
