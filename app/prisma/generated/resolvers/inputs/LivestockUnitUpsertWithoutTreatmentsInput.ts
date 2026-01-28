import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateWithoutTreatmentsInput";
import { LivestockUnitUpdateWithoutTreatmentsInput } from "../inputs/LivestockUnitUpdateWithoutTreatmentsInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutTreatmentsInput", {})
export class LivestockUnitUpsertWithoutTreatmentsInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutTreatmentsInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutTreatmentsInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutTreatmentsInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutTreatmentsInput;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;
}
