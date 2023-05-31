import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutDamInput } from "../inputs/LivestockUnitCreateOrConnectWithoutDamInput";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutDamInput", {
  isAbstract: true,
})
export class LivestockUnitCreateNestedOneWithoutDamInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutDamInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutDamInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateOrConnectWithoutDamInput, {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutDamInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
