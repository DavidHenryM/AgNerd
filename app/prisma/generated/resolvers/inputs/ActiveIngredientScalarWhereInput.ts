import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumIngredientFilter } from "../inputs/EnumIngredientFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ActiveIngredientScalarWhereInput", {})
export class ActiveIngredientScalarWhereInput {
  @TypeGraphQL.Field((_type) => [ActiveIngredientScalarWhereInput], {
    nullable: true,
  })
  AND?: ActiveIngredientScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientScalarWhereInput], {
    nullable: true,
  })
  OR?: ActiveIngredientScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientScalarWhereInput], {
    nullable: true,
  })
  NOT?: ActiveIngredientScalarWhereInput[] | undefined;

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
}
