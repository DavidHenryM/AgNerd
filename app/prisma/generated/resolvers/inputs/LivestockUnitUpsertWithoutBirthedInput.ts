import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutBirthedInput } from "../inputs/LivestockUnitCreateWithoutBirthedInput";
import { LivestockUnitUpdateWithoutBirthedInput } from "../inputs/LivestockUnitUpdateWithoutBirthedInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutBirthedInput", {})
export class LivestockUnitUpsertWithoutBirthedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutBirthedInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutBirthedInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutBirthedInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutBirthedInput;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;
}
