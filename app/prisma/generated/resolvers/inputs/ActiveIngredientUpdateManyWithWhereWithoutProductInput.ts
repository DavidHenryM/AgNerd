import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientScalarWhereInput } from "../inputs/ActiveIngredientScalarWhereInput";
import { ActiveIngredientUpdateManyMutationInput } from "../inputs/ActiveIngredientUpdateManyMutationInput";

@TypeGraphQL.InputType(
  "ActiveIngredientUpdateManyWithWhereWithoutProductInput",
  {},
)
export class ActiveIngredientUpdateManyWithWhereWithoutProductInput {
  @TypeGraphQL.Field((_type) => ActiveIngredientScalarWhereInput, {
    nullable: false,
  })
  where!: ActiveIngredientScalarWhereInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientUpdateManyMutationInput, {
    nullable: false,
  })
  data!: ActiveIngredientUpdateManyMutationInput;
}
