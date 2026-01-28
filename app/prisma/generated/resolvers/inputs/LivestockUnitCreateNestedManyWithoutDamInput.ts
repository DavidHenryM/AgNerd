import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManyDamInputEnvelope } from "../inputs/LivestockUnitCreateManyDamInputEnvelope";
import { LivestockUnitCreateOrConnectWithoutDamInput } from "../inputs/LivestockUnitCreateOrConnectWithoutDamInput";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedManyWithoutDamInput", {})
export class LivestockUnitCreateNestedManyWithoutDamInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateWithoutDamInput], {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutDamInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitCreateOrConnectWithoutDamInput], {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutDamInput[] | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateManyDamInputEnvelope, {
    nullable: true,
  })
  createMany?: LivestockUnitCreateManyDamInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput[] | undefined;
}
