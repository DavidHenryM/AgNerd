import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateWithoutActiveIngredientsInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalProductCreateOrConnectWithoutActiveIngredientsInput",
  {},
)
export class ChemicalProductCreateOrConnectWithoutActiveIngredientsInput {
  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalProductWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateWithoutActiveIngredientsInput,
    {
      nullable: false,
    },
  )
  create!: ChemicalProductCreateWithoutActiveIngredientsInput;
}
