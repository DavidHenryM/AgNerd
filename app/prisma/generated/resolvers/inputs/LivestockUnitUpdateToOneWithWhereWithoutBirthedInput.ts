import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutBirthedInput } from "../inputs/LivestockUnitUpdateWithoutBirthedInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateToOneWithWhereWithoutBirthedInput",
  {},
)
export class LivestockUnitUpdateToOneWithWhereWithoutBirthedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutBirthedInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutBirthedInput;
}
