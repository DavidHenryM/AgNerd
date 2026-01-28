import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionUpdateWithoutPaddockInput } from "../inputs/LivestockUnitPositionUpdateWithoutPaddockInput";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitPositionUpdateToOneWithWhereWithoutPaddockInput",
  {},
)
export class LivestockUnitPositionUpdateToOneWithWhereWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitPositionWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateWithoutPaddockInput,
    {
      nullable: false,
    },
  )
  data!: LivestockUnitPositionUpdateWithoutPaddockInput;
}
