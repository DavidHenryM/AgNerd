import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateOrConnectWithoutMobInput } from "../inputs/GrazeCreateOrConnectWithoutMobInput";
import { GrazeCreateWithoutMobInput } from "../inputs/GrazeCreateWithoutMobInput";
import { GrazeScalarWhereInput } from "../inputs/GrazeScalarWhereInput";
import { GrazeUpdateManyWithWhereWithoutMobInput } from "../inputs/GrazeUpdateManyWithWhereWithoutMobInput";
import { GrazeUpdateWithWhereUniqueWithoutMobInput } from "../inputs/GrazeUpdateWithWhereUniqueWithoutMobInput";
import { GrazeUpsertWithWhereUniqueWithoutMobInput } from "../inputs/GrazeUpsertWithWhereUniqueWithoutMobInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeUpdateManyWithoutMobNestedInput", {
  isAbstract: true,
})
export class GrazeUpdateManyWithoutMobNestedInput {
  @TypeGraphQL.Field((_type) => [GrazeCreateWithoutMobInput], {
    nullable: true,
  })
  create?: GrazeCreateWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeCreateOrConnectWithoutMobInput], {
    nullable: true,
  })
  connectOrCreate?: GrazeCreateOrConnectWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeUpsertWithWhereUniqueWithoutMobInput], {
    nullable: true,
  })
  upsert?: GrazeUpsertWithWhereUniqueWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeWhereUniqueInput], {
    nullable: true,
  })
  set?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeWhereUniqueInput], {
    nullable: true,
  })
  delete?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeWhereUniqueInput], {
    nullable: true,
  })
  connect?: GrazeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeUpdateWithWhereUniqueWithoutMobInput], {
    nullable: true,
  })
  update?: GrazeUpdateWithWhereUniqueWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeUpdateManyWithWhereWithoutMobInput], {
    nullable: true,
  })
  updateMany?: GrazeUpdateManyWithWhereWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: GrazeScalarWhereInput[] | undefined;
}
