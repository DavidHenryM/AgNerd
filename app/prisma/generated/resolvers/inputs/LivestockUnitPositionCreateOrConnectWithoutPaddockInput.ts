import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateWithoutPaddockInput";
import { LivestockUnitPositionWhereUniqueInput } from "../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionCreateOrConnectWithoutPaddockInput",
  {},
)
export class LivestockUnitPositionCreateOrConnectWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitPositionWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateWithoutPaddockInput,
    {
      nullable: false,
    },
  )
  create!: LivestockUnitPositionCreateWithoutPaddockInput;
}
