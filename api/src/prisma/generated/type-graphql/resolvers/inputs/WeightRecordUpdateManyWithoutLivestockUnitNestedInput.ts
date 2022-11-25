import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordCreateManyLivestockUnitInputEnvelope } from "../inputs/WeightRecordCreateManyLivestockUnitInputEnvelope";
import { WeightRecordCreateOrConnectWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateOrConnectWithoutLivestockUnitInput";
import { WeightRecordCreateWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateWithoutLivestockUnitInput";
import { WeightRecordScalarWhereInput } from "../inputs/WeightRecordScalarWhereInput";
import { WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput } from "../inputs/WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput";
import { WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput } from "../inputs/WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput";
import { WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput } from "../inputs/WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput";
import { WeightRecordWhereUniqueInput } from "../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.InputType("WeightRecordUpdateManyWithoutLivestockUnitNestedInput", {
  isAbstract: true
})
export class WeightRecordUpdateManyWithoutLivestockUnitNestedInput {
  @TypeGraphQL.Field(_type => [WeightRecordCreateWithoutLivestockUnitInput], {
    nullable: true
  })
  create?: WeightRecordCreateWithoutLivestockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordCreateOrConnectWithoutLivestockUnitInput], {
    nullable: true
  })
  connectOrCreate?: WeightRecordCreateOrConnectWithoutLivestockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput], {
    nullable: true
  })
  upsert?: WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => WeightRecordCreateManyLivestockUnitInputEnvelope, {
    nullable: true
  })
  createMany?: WeightRecordCreateManyLivestockUnitInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordWhereUniqueInput], {
    nullable: true
  })
  set?: WeightRecordWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordWhereUniqueInput], {
    nullable: true
  })
  disconnect?: WeightRecordWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordWhereUniqueInput], {
    nullable: true
  })
  delete?: WeightRecordWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordWhereUniqueInput], {
    nullable: true
  })
  connect?: WeightRecordWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput], {
    nullable: true
  })
  update?: WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput], {
    nullable: true
  })
  updateMany?: WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereInput], {
    nullable: true
  })
  deleteMany?: WeightRecordScalarWhereInput[] | undefined;
}
