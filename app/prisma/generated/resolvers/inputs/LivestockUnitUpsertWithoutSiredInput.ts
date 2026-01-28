import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutSiredInput } from "../inputs/LivestockUnitCreateWithoutSiredInput";
import { LivestockUnitUpdateWithoutSiredInput } from "../inputs/LivestockUnitUpdateWithoutSiredInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutSiredInput", {})
export class LivestockUnitUpsertWithoutSiredInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutSiredInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutSiredInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutSiredInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutSiredInput;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;
}
