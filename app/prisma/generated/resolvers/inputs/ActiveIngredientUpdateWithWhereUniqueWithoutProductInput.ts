import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientUpdateWithoutProductInput } from "../inputs/ActiveIngredientUpdateWithoutProductInput";
import { ActiveIngredientWhereUniqueInput } from "../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.InputType(
  "ActiveIngredientUpdateWithWhereUniqueWithoutProductInput",
  {},
)
export class ActiveIngredientUpdateWithWhereUniqueWithoutProductInput {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereUniqueInput, {
    nullable: false,
  })
  where!: ActiveIngredientWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientUpdateWithoutProductInput, {
    nullable: false,
  })
  data!: ActiveIngredientUpdateWithoutProductInput;
}
