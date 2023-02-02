import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateOrConnectWithoutTreatmentsInput";
import { LivestockUnitCreateWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateWithoutTreatmentsInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutTreatmentsInput", {
  isAbstract: true
})
export class LivestockUnitCreateNestedOneWithoutTreatmentsInput {
  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutTreatmentsInput, {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutTreatmentsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateOrConnectWithoutTreatmentsInput, {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutTreatmentsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: true
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
