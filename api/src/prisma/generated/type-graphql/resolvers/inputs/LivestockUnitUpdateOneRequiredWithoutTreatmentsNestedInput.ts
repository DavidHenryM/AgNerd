import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateOrConnectWithoutTreatmentsInput";
import { LivestockUnitCreateWithoutTreatmentsInput } from "../inputs/LivestockUnitCreateWithoutTreatmentsInput";
import { LivestockUnitUpdateWithoutTreatmentsInput } from "../inputs/LivestockUnitUpdateWithoutTreatmentsInput";
import { LivestockUnitUpsertWithoutTreatmentsInput } from "../inputs/LivestockUnitUpsertWithoutTreatmentsInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput", {
  isAbstract: true
})
export class LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput {
  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutTreatmentsInput, {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutTreatmentsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateOrConnectWithoutTreatmentsInput, {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutTreatmentsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpsertWithoutTreatmentsInput, {
    nullable: true
  })
  upsert?: LivestockUnitUpsertWithoutTreatmentsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: true
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateWithoutTreatmentsInput, {
    nullable: true
  })
  update?: LivestockUnitUpdateWithoutTreatmentsInput | undefined;
}
