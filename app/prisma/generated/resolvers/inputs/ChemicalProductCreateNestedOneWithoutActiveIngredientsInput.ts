import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateOrConnectWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateOrConnectWithoutActiveIngredientsInput";
import { ChemicalProductCreateWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateWithoutActiveIngredientsInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalProductCreateNestedOneWithoutActiveIngredientsInput",
  {},
)
export class ChemicalProductCreateNestedOneWithoutActiveIngredientsInput {
  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateWithoutActiveIngredientsInput,
    {
      nullable: true,
    },
  )
  create?: ChemicalProductCreateWithoutActiveIngredientsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateOrConnectWithoutActiveIngredientsInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | ChemicalProductCreateOrConnectWithoutActiveIngredientsInput
    | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalProductWhereUniqueInput | undefined;
}
