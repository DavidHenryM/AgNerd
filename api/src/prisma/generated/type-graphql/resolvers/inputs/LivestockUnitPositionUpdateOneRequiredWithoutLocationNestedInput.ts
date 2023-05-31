import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateOrConnectWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateOrConnectWithoutLocationInput";
import { LivestockUnitPositionCreateWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateWithoutLocationInput";
import { LivestockUnitPositionUpdateWithoutLocationInput } from "../inputs/LivestockUnitPositionUpdateWithoutLocationInput";
import { LivestockUnitPositionUpsertWithoutLocationInput } from "../inputs/LivestockUnitPositionUpsertWithoutLocationInput";
import { LivestockUnitPositionWhereUniqueInput } from "../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput",
  {
    isAbstract: true,
  }
)
export class LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateWithoutLocationInput,
    {
      nullable: true,
    }
  )
  create?: LivestockUnitPositionCreateWithoutLocationInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateOrConnectWithoutLocationInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | LivestockUnitPositionCreateOrConnectWithoutLocationInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpsertWithoutLocationInput,
    {
      nullable: true,
    }
  )
  upsert?: LivestockUnitPositionUpsertWithoutLocationInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitPositionWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateWithoutLocationInput,
    {
      nullable: true,
    }
  )
  update?: LivestockUnitPositionUpdateWithoutLocationInput | undefined;
}
