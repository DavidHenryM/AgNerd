import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { ChemicalProduct } from "../models/ChemicalProduct";
import { Ingredient } from "../enums/Ingredient";

@TypeGraphQL.ObjectType("ActiveIngredient", {})
export class ActiveIngredient {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => Ingredient, {
    nullable: false,
  })
  ingredient!: "TRICLABENDAZOLE" | "ABAMECTIN";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  mgPermL!: number;

  product?: ChemicalProduct;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  productId!: string;
}
