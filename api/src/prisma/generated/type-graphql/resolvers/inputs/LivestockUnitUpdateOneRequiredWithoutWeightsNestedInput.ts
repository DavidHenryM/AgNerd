import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutWeightsInput } from "../inputs/LivestockUnitCreateOrConnectWithoutWeightsInput";
import { LivestockUnitCreateWithoutWeightsInput } from "../inputs/LivestockUnitCreateWithoutWeightsInput";
import { LivestockUnitUpdateWithoutWeightsInput } from "../inputs/LivestockUnitUpdateWithoutWeightsInput";
import { LivestockUnitUpsertWithoutWeightsInput } from "../inputs/LivestockUnitUpsertWithoutWeightsInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateOneRequiredWithoutWeightsNestedInput",
  {
    isAbstract: true,
  }
)
export class LivestockUnitUpdateOneRequiredWithoutWeightsNestedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutWeightsInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutWeightsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateOrConnectWithoutWeightsInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutWeightsInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpsertWithoutWeightsInput, {
    nullable: true,
  })
  upsert?: LivestockUnitUpsertWithoutWeightsInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutWeightsInput, {
    nullable: true,
  })
  update?: LivestockUnitUpdateWithoutWeightsInput | undefined;
}
