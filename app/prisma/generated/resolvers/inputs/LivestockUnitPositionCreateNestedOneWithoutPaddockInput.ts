import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateOrConnectWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateOrConnectWithoutPaddockInput";
import { LivestockUnitPositionCreateWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateWithoutPaddockInput";
import { LivestockUnitPositionWhereUniqueInput } from "../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionCreateNestedOneWithoutPaddockInput",
  {},
)
export class LivestockUnitPositionCreateNestedOneWithoutPaddockInput {
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

  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitPositionWhereUniqueInput | undefined;
}
