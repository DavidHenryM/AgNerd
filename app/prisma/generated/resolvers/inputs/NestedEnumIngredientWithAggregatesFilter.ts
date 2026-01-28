import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumIngredientFilter } from "../inputs/NestedEnumIngredientFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { Ingredient } from "../../enums/Ingredient";

@TypeGraphQL.InputType("NestedEnumIngredientWithAggregatesFilter", {})
export class NestedEnumIngredientWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => Ingredient, {
    nullable: true,
  })
  equals?: "TRICLABENDAZOLE" | "ABAMECTIN" | undefined;

  @TypeGraphQL.Field((_type) => [Ingredient], {
    nullable: true,
  })
  in?: Array<"TRICLABENDAZOLE" | "ABAMECTIN"> | undefined;

  @TypeGraphQL.Field((_type) => [Ingredient], {
    nullable: true,
  })
  notIn?: Array<"TRICLABENDAZOLE" | "ABAMECTIN"> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumIngredientWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumIngredientWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumIngredientFilter, {
    nullable: true,
  })
  _min?: NestedEnumIngredientFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumIngredientFilter, {
    nullable: true,
  })
  _max?: NestedEnumIngredientFilter | undefined;
}
