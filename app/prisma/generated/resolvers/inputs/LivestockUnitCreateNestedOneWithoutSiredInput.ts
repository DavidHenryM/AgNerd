import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutSiredInput } from "../inputs/LivestockUnitCreateOrConnectWithoutSiredInput";
import { LivestockUnitCreateWithoutSiredInput } from "../inputs/LivestockUnitCreateWithoutSiredInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutSiredInput", {})
export class LivestockUnitCreateNestedOneWithoutSiredInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutSiredInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutSiredInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateOrConnectWithoutSiredInput, {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutSiredInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
