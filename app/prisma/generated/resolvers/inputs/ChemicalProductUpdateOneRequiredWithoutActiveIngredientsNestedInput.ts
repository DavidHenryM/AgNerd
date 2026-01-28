import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateOrConnectWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateOrConnectWithoutActiveIngredientsInput";
import { ChemicalProductCreateWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateWithoutActiveIngredientsInput";
import { ChemicalProductUpdateToOneWithWhereWithoutActiveIngredientsInput } from "../inputs/ChemicalProductUpdateToOneWithWhereWithoutActiveIngredientsInput";
import { ChemicalProductUpsertWithoutActiveIngredientsInput } from "../inputs/ChemicalProductUpsertWithoutActiveIngredientsInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalProductUpdateOneRequiredWithoutActiveIngredientsNestedInput",
  {},
)
export class ChemicalProductUpdateOneRequiredWithoutActiveIngredientsNestedInput {
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

  @TypeGraphQL.Field(
    (_type) => ChemicalProductUpsertWithoutActiveIngredientsInput,
    {
      nullable: true,
    },
  )
  upsert?: ChemicalProductUpsertWithoutActiveIngredientsInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalProductWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductUpdateToOneWithWhereWithoutActiveIngredientsInput,
    {
      nullable: true,
    },
  )
  update?:
    | ChemicalProductUpdateToOneWithWhereWithoutActiveIngredientsInput
    | undefined;
}
