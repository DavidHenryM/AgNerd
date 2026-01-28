import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateOrConnectWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateOrConnectWithoutLocationInput";
import { LivestockUnitPositionCreateWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateWithoutLocationInput";
import { LivestockUnitPositionUpdateToOneWithWhereWithoutLocationInput } from "../inputs/LivestockUnitPositionUpdateToOneWithWhereWithoutLocationInput";
import { LivestockUnitPositionUpsertWithoutLocationInput } from "../inputs/LivestockUnitPositionUpsertWithoutLocationInput";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";
import { LivestockUnitPositionWhereUniqueInput } from "../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionUpdateOneWithoutLocationNestedInput",
  {},
)
export class LivestockUnitPositionUpdateOneWithoutLocationNestedInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateWithoutLocationInput,
    {
      nullable: true,
    },
  )
  create?: LivestockUnitPositionCreateWithoutLocationInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateOrConnectWithoutLocationInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | LivestockUnitPositionCreateOrConnectWithoutLocationInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpsertWithoutLocationInput,
    {
      nullable: true,
    },
  )
  upsert?: LivestockUnitPositionUpsertWithoutLocationInput | undefined;

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
    (_type) => LivestockUnitPositionUpdateToOneWithWhereWithoutLocationInput,
    {
      nullable: true,
    },
  )
  update?:
    | LivestockUnitPositionUpdateToOneWithWhereWithoutLocationInput
    | undefined;
}
