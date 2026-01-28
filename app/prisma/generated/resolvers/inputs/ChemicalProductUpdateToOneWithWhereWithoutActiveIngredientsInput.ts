import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductUpdateWithoutActiveIngredientsInput } from "../inputs/ChemicalProductUpdateWithoutActiveIngredientsInput";
import { ChemicalProductWhereInput } from "../inputs/ChemicalProductWhereInput";

@TypeGraphQL.InputType(
  "ChemicalProductUpdateToOneWithWhereWithoutActiveIngredientsInput",
  {},
)
export class ChemicalProductUpdateToOneWithWhereWithoutActiveIngredientsInput {
  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  where?: ChemicalProductWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductUpdateWithoutActiveIngredientsInput,
    {
      nullable: false,
    },
  )
  data!: ChemicalProductUpdateWithoutActiveIngredientsInput;
}
