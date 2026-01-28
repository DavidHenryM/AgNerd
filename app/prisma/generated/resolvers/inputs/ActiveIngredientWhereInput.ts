import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductRelationFilter } from "../inputs/ChemicalProductRelationFilter";
import { EnumIngredientFilter } from "../inputs/EnumIngredientFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ActiveIngredientWhereInput", {})
export class ActiveIngredientWhereInput {
  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereInput], {
    nullable: true,
  })
  AND?: ActiveIngredientWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereInput], {
    nullable: true,
  })
  OR?: ActiveIngredientWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereInput], {
    nullable: true,
  })
  NOT?: ActiveIngredientWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumIngredientFilter, {
    nullable: true,
  })
  ingredient?: EnumIngredientFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  mgPermL?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  productId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductRelationFilter, {
    nullable: true,
  })
  product?: ChemicalProductRelationFilter | undefined;
}
