import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManyMobInputEnvelope } from "../inputs/LivestockUnitCreateManyMobInputEnvelope";
import { LivestockUnitCreateOrConnectWithoutMobInput } from "../inputs/LivestockUnitCreateOrConnectWithoutMobInput";
import { LivestockUnitCreateWithoutMobInput } from "../inputs/LivestockUnitCreateWithoutMobInput";
import { LivestockUnitScalarWhereInput } from "../inputs/LivestockUnitScalarWhereInput";
import { LivestockUnitUpdateManyWithWhereWithoutMobInput } from "../inputs/LivestockUnitUpdateManyWithWhereWithoutMobInput";
import { LivestockUnitUpdateWithWhereUniqueWithoutMobInput } from "../inputs/LivestockUnitUpdateWithWhereUniqueWithoutMobInput";
import { LivestockUnitUpsertWithWhereUniqueWithoutMobInput } from "../inputs/LivestockUnitUpsertWithWhereUniqueWithoutMobInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateManyWithoutMobNestedInput", {
  isAbstract: true
})
export class LivestockUnitUpdateManyWithoutMobNestedInput {
  @TypeGraphQL.Field(_type => [LivestockUnitCreateWithoutMobInput], {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutMobInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitCreateOrConnectWithoutMobInput], {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutMobInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitUpsertWithWhereUniqueWithoutMobInput], {
    nullable: true
  })
  upsert?: LivestockUnitUpsertWithWhereUniqueWithoutMobInput[] | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateManyMobInputEnvelope, {
    nullable: true
  })
  createMany?: LivestockUnitCreateManyMobInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitWhereUniqueInput], {
    nullable: true
  })
  set?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitWhereUniqueInput], {
    nullable: true
  })
  disconnect?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitWhereUniqueInput], {
    nullable: true
  })
  delete?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitWhereUniqueInput], {
    nullable: true
  })
  connect?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitUpdateWithWhereUniqueWithoutMobInput], {
    nullable: true
  })
  update?: LivestockUnitUpdateWithWhereUniqueWithoutMobInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitUpdateManyWithWhereWithoutMobInput], {
    nullable: true
  })
  updateMany?: LivestockUnitUpdateManyWithWhereWithoutMobInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LivestockUnitScalarWhereInput[] | undefined;
}
