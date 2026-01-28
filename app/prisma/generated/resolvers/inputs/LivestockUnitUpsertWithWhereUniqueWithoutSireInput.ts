import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutSireInput } from "../inputs/LivestockUnitCreateWithoutSireInput";
import { LivestockUnitUpdateWithoutSireInput } from "../inputs/LivestockUnitUpdateWithoutSireInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithWhereUniqueWithoutSireInput", {})
export class LivestockUnitUpsertWithWhereUniqueWithoutSireInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutSireInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutSireInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutSireInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutSireInput;
}
