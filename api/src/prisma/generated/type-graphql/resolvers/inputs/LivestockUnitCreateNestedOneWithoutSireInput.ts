import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutSireInput } from "../inputs/LivestockUnitCreateOrConnectWithoutSireInput";
import { LivestockUnitCreateWithoutSireInput } from "../inputs/LivestockUnitCreateWithoutSireInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutSireInput", {
  isAbstract: true,
})
export class LivestockUnitCreateNestedOneWithoutSireInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutSireInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutSireInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateOrConnectWithoutSireInput, {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutSireInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
