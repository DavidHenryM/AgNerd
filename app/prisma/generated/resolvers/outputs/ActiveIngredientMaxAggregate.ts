import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Ingredient } from "../../enums/Ingredient";

@TypeGraphQL.ObjectType("ActiveIngredientMaxAggregate", {})
export class ActiveIngredientMaxAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => Ingredient, {
    nullable: true,
  })
  ingredient!: "TRICLABENDAZOLE" | "ABAMECTIN" | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  mgPermL!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  productId!: string | null;
}
