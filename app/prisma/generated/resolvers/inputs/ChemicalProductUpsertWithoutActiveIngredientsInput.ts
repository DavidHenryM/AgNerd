import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateWithoutActiveIngredientsInput";
import { ChemicalProductUpdateWithoutActiveIngredientsInput } from "../inputs/ChemicalProductUpdateWithoutActiveIngredientsInput";
import { ChemicalProductWhereInput } from "../inputs/ChemicalProductWhereInput";

@TypeGraphQL.InputType("ChemicalProductUpsertWithoutActiveIngredientsInput", {})
export class ChemicalProductUpsertWithoutActiveIngredientsInput {
  @TypeGraphQL.Field(
    (_type) => ChemicalProductUpdateWithoutActiveIngredientsInput,
    {
      nullable: false,
    },
  )
  update!: ChemicalProductUpdateWithoutActiveIngredientsInput;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateWithoutActiveIngredientsInput,
    {
      nullable: false,
    },
  )
  create!: ChemicalProductCreateWithoutActiveIngredientsInput;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  where?: ChemicalProductWhereInput | undefined;
}
