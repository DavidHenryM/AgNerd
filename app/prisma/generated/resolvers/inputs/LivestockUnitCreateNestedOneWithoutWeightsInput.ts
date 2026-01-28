import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutWeightsInput } from "../inputs/LivestockUnitCreateOrConnectWithoutWeightsInput";
import { LivestockUnitCreateWithoutWeightsInput } from "../inputs/LivestockUnitCreateWithoutWeightsInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutWeightsInput", {})
export class LivestockUnitCreateNestedOneWithoutWeightsInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutWeightsInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutWeightsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateOrConnectWithoutWeightsInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutWeightsInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
