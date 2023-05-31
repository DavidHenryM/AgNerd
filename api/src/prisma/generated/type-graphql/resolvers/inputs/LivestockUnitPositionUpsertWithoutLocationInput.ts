import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateWithoutLocationInput } from "../inputs/LivestockUnitPositionCreateWithoutLocationInput";
import { LivestockUnitPositionUpdateWithoutLocationInput } from "../inputs/LivestockUnitPositionUpdateWithoutLocationInput";

@TypeGraphQL.InputType("LivestockUnitPositionUpsertWithoutLocationInput", {
  isAbstract: true,
})
export class LivestockUnitPositionUpsertWithoutLocationInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateWithoutLocationInput,
    {
      nullable: false,
    }
  )
  update!: LivestockUnitPositionUpdateWithoutLocationInput;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionCreateWithoutLocationInput,
    {
      nullable: false,
    }
  )
  create!: LivestockUnitPositionCreateWithoutLocationInput;
}
