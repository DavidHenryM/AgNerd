import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionUpdateWithoutLocationInput } from "../inputs/LivestockUnitPositionUpdateWithoutLocationInput";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionUpdateToOneWithWhereWithoutLocationInput",
  {},
)
export class LivestockUnitPositionUpdateToOneWithWhereWithoutLocationInput {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitPositionWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateWithoutLocationInput,
    {
      nullable: false,
    },
  )
  data!: LivestockUnitPositionUpdateWithoutLocationInput;
}
