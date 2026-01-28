import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateOrConnectWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateOrConnectWithoutLivestockUnitPositionInput";
import { PaddockCreateWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateWithoutLivestockUnitPositionInput";
import { PaddockUpdateToOneWithWhereWithoutLivestockUnitPositionInput } from "../inputs/PaddockUpdateToOneWithWhereWithoutLivestockUnitPositionInput";
import { PaddockUpsertWithoutLivestockUnitPositionInput } from "../inputs/PaddockUpsertWithoutLivestockUnitPositionInput";
import { PaddockWhereInput } from "../inputs/PaddockWhereInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType(
  "PaddockUpdateOneWithoutLivestockUnitPositionNestedInput",
  {},
)
export class PaddockUpdateOneWithoutLivestockUnitPositionNestedInput {
  @TypeGraphQL.Field(
    (_type) => PaddockCreateWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  create?: PaddockCreateWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockCreateOrConnectWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | PaddockCreateOrConnectWithoutLivestockUnitPositionInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpsertWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  upsert?: PaddockUpsertWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  disconnect?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  delete?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: true,
  })
  connect?: PaddockWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpdateToOneWithWhereWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  update?:
    | PaddockUpdateToOneWithWhereWithoutLivestockUnitPositionInput
    | undefined;
}
