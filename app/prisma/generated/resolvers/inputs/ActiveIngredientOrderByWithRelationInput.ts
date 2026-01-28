import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductOrderByWithRelationInput } from "../inputs/ChemicalProductOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ActiveIngredientOrderByWithRelationInput", {})
export class ActiveIngredientOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  ingredient?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  mgPermL?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  productId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductOrderByWithRelationInput, {
    nullable: true,
  })
  product?: ChemicalProductOrderByWithRelationInput | undefined;
}
