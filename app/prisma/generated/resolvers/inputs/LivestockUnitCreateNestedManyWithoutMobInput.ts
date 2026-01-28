import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManyMobInputEnvelope } from "../inputs/LivestockUnitCreateManyMobInputEnvelope";
import { LivestockUnitCreateOrConnectWithoutMobInput } from "../inputs/LivestockUnitCreateOrConnectWithoutMobInput";
import { LivestockUnitCreateWithoutMobInput } from "../inputs/LivestockUnitCreateWithoutMobInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedManyWithoutMobInput", {})
export class LivestockUnitCreateNestedManyWithoutMobInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateWithoutMobInput], {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitCreateOrConnectWithoutMobInput], {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateManyMobInputEnvelope, {
    nullable: true,
  })
  createMany?: LivestockUnitCreateManyMobInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput[] | undefined;
}
