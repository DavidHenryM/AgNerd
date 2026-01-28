import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientCreateWithoutProductInput } from "../inputs/ActiveIngredientCreateWithoutProductInput";
import { ActiveIngredientWhereUniqueInput } from "../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.InputType("ActiveIngredientCreateOrConnectWithoutProductInput", {})
export class ActiveIngredientCreateOrConnectWithoutProductInput {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereUniqueInput, {
    nullable: false,
  })
  where!: ActiveIngredientWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientCreateWithoutProductInput, {
    nullable: false,
  })
  create!: ActiveIngredientCreateWithoutProductInput;
}
