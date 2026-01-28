import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientCreateManyProductInputEnvelope } from "../inputs/ActiveIngredientCreateManyProductInputEnvelope";
import { ActiveIngredientCreateOrConnectWithoutProductInput } from "../inputs/ActiveIngredientCreateOrConnectWithoutProductInput";
import { ActiveIngredientCreateWithoutProductInput } from "../inputs/ActiveIngredientCreateWithoutProductInput";
import { ActiveIngredientWhereUniqueInput } from "../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.InputType(
  "ActiveIngredientCreateNestedManyWithoutProductInput",
  {},
)
export class ActiveIngredientCreateNestedManyWithoutProductInput {
  @TypeGraphQL.Field((_type) => [ActiveIngredientCreateWithoutProductInput], {
    nullable: true,
  })
  create?: ActiveIngredientCreateWithoutProductInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ActiveIngredientCreateOrConnectWithoutProductInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | ActiveIngredientCreateOrConnectWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => ActiveIngredientCreateManyProductInputEnvelope,
    {
      nullable: true,
    },
  )
  createMany?: ActiveIngredientCreateManyProductInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereUniqueInput], {
    nullable: true,
  })
  connect?: ActiveIngredientWhereUniqueInput[] | undefined;
}
