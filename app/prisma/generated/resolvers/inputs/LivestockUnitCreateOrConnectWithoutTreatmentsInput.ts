import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateWithoutTreatmentsInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateOrConnectWithoutTreatmentsInput", {})
export class LivestockUnitCreateOrConnectWithoutTreatmentsInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutTreatmentsInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutTreatmentsInput;
}
