import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateManyPaddockInputEnvelope } from "../inputs/GrazeCreateManyPaddockInputEnvelope";
import { GrazeCreateOrConnectWithoutPaddockInput } from "../inputs/GrazeCreateOrConnectWithoutPaddockInput";
import { GrazeCreateWithoutPaddockInput } from "../inputs/GrazeCreateWithoutPaddockInput";
import { GrazeScalarWhereInput } from "../inputs/GrazeScalarWhereInput";
import { GrazeUpdateManyWithWhereWithoutPaddockInput } from "../inputs/GrazeUpdateManyWithWhereWithoutPaddockInput";
import { GrazeUpdateWithWhereUniqueWithoutPaddockInput } from "../inputs/GrazeUpdateWithWhereUniqueWithoutPaddockInput";
import { GrazeUpsertWithWhereUniqueWithoutPaddockInput } from "../inputs/GrazeUpsertWithWhereUniqueWithoutPaddockInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeUpdateManyWithoutPaddockNestedInput", {
  isAbstract: true
})
export class GrazeUpdateManyWithoutPaddockNestedInput {
  @TypeGraphQL.Field(_type => [GrazeCreateWithoutPaddockInput], {
    nullable: true
  })
  create?: GrazeCreateWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeCreateOrConnectWithoutPaddockInput], {
    nullable: true
  })
  connectOrCreate?: GrazeCreateOrConnectWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeUpsertWithWhereUniqueWithoutPaddockInput], {
    nullable: true
  })
  upsert?: GrazeUpsertWithWhereUniqueWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(_type => GrazeCreateManyPaddockInputEnvelope, {
    nullable: true
  })
  createMany?: GrazeCreateManyPaddockInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [GrazeWhereUniqueInput], {
    nullable: true
  })
  set?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeWhereUniqueInput], {
    nullable: true
  })
  disconnect?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeWhereUniqueInput], {
    nullable: true
  })
  delete?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeWhereUniqueInput], {
    nullable: true
  })
  connect?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeUpdateWithWhereUniqueWithoutPaddockInput], {
    nullable: true
  })
  update?: GrazeUpdateWithWhereUniqueWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeUpdateManyWithWhereWithoutPaddockInput], {
    nullable: true
  })
  updateMany?: GrazeUpdateManyWithWhereWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeScalarWhereInput], {
    nullable: true
  })
  deleteMany?: GrazeScalarWhereInput[] | undefined;
}
