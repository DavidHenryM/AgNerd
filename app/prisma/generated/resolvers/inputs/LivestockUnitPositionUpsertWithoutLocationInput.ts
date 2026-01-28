import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateWithoutLocationInput";
import { LivestockUnitPositionUpdateWithoutLocationInput } from "../inputs/LivestockUnitPositionUpdateWithoutLocationInput";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";

@TypeGraphQL.InputType("LivestockUnitPositionUpsertWithoutLocationInput", {})
export class LivestockUnitPositionUpsertWithoutLocationInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateWithoutLocationInput,
    {
      nullable: false,
    },
  )
  update!: LivestockUnitPositionUpdateWithoutLocationInput;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateWithoutLocationInput,
    {
      nullable: false,
    },
  )
  create!: LivestockUnitPositionCreateWithoutLocationInput;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitPositionWhereInput | undefined;
}
