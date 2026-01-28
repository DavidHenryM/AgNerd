import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientCreateManyProductInputEnvelope } from "../inputs/ActiveIngredientCreateManyProductInputEnvelope";
import { ActiveIngredientCreateOrConnectWithoutProductInput } from "../inputs/ActiveIngredientCreateOrConnectWithoutProductInput";
import { ActiveIngredientCreateWithoutProductInput } from "../inputs/ActiveIngredientCreateWithoutProductInput";
import { ActiveIngredientScalarWhereInput } from "../inputs/ActiveIngredientScalarWhereInput";
import { ActiveIngredientUpdateManyWithWhereWithoutProductInput } from "../inputs/ActiveIngredientUpdateManyWithWhereWithoutProductInput";
import { ActiveIngredientUpdateWithWhereUniqueWithoutProductInput } from "../inputs/ActiveIngredientUpdateWithWhereUniqueWithoutProductInput";
import { ActiveIngredientUpsertWithWhereUniqueWithoutProductInput } from "../inputs/ActiveIngredientUpsertWithWhereUniqueWithoutProductInput";
import { ActiveIngredientWhereUniqueInput } from "../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.InputType(
  "ActiveIngredientUpdateManyWithoutProductNestedInput",
  {},
)
export class ActiveIngredientUpdateManyWithoutProductNestedInput {
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
    (_type) => [ActiveIngredientUpsertWithWhereUniqueWithoutProductInput],
    {
      nullable: true,
    },
  )
  upsert?:
    | ActiveIngredientUpsertWithWhereUniqueWithoutProductInput[]
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
  set?: ActiveIngredientWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: ActiveIngredientWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereUniqueInput], {
    nullable: true,
  })
  delete?: ActiveIngredientWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientWhereUniqueInput], {
    nullable: true,
  })
  connect?: ActiveIngredientWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ActiveIngredientUpdateWithWhereUniqueWithoutProductInput],
    {
      nullable: true,
    },
  )
  update?:
    | ActiveIngredientUpdateWithWhereUniqueWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [ActiveIngredientUpdateManyWithWhereWithoutProductInput],
    {
      nullable: true,
    },
  )
  updateMany?:
    | ActiveIngredientUpdateManyWithWhereWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: ActiveIngredientScalarWhereInput[] | undefined;
}
