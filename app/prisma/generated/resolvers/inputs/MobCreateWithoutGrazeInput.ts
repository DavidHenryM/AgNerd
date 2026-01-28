import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedManyWithoutMobInput } from "../inputs/LivestockUnitCreateNestedManyWithoutMobInput";

@TypeGraphQL.InputType("MobCreateWithoutGrazeInput", {})
export class MobCreateWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  comment?: string | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedManyWithoutMobInput, {
    nullable: true,
  })
  members?: LivestockUnitCreateNestedManyWithoutMobInput | undefined;
}
