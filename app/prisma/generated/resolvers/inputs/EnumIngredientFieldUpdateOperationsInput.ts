import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Ingredient } from "../../enums/Ingredient";

@TypeGraphQL.InputType("EnumIngredientFieldUpdateOperationsInput", {})
export class EnumIngredientFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => Ingredient, {
    nullable: true,
  })
  set?: "TRICLABENDAZOLE" | "ABAMECTIN" | undefined;
}
