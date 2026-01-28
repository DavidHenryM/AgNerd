import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateOrConnectWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateOrConnectWithoutPaddockInput";
import { LivestockUnitPositionCreateWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateWithoutPaddockInput";
import { LivestockUnitPositionUpdateToOneWithWhereWithoutPaddockInput } from "../inputs/LivestockUnitPositionUpdateToOneWithWhereWithoutPaddockInput";
import { LivestockUnitPositionUpsertWithoutPaddockInput } from "../inputs/LivestockUnitPositionUpsertWithoutPaddockInput";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";
import { LivestockUnitPositionWhereUniqueInput } from "../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionUpdateOneWithoutPaddockNestedInput",
  {},
)
export class LivestockUnitPositionUpdateOneWithoutPaddockNestedInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateWithoutPaddockInput,
    {
      nullable: true,
    },
  )
  create?: LivestockUnitPositionCreateWithoutPaddockInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateOrConnectWithoutPaddockInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | LivestockUnitPositionCreateOrConnectWithoutPaddockInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpsertWithoutPaddockInput,
    {
      nullable: true,
    },
  )
  upsert?: LivestockUnitPositionUpsertWithoutPaddockInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  delete?: LivestockUnitPositionWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitPositionWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateToOneWithWhereWithoutPaddockInput,
    {
      nullable: true,
    },
  )
  update?:
    | LivestockUnitPositionUpdateToOneWithWhereWithoutPaddockInput
    | undefined;
}
