import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutSiredInput } from "../inputs/LivestockUnitUpdateWithoutSiredInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitUpdateToOneWithWhereWithoutSiredInput", {})
export class LivestockUnitUpdateToOneWithWhereWithoutSiredInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutSiredInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutSiredInput;
}
