import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateOrConnectWithoutGrazeInput } from "../inputs/MobCreateOrConnectWithoutGrazeInput";
import { MobCreateWithoutGrazeInput } from "../inputs/MobCreateWithoutGrazeInput";
import { MobScalarWhereInput } from "../inputs/MobScalarWhereInput";
import { MobUpdateManyWithWhereWithoutGrazeInput } from "../inputs/MobUpdateManyWithWhereWithoutGrazeInput";
import { MobUpdateWithWhereUniqueWithoutGrazeInput } from "../inputs/MobUpdateWithWhereUniqueWithoutGrazeInput";
import { MobUpsertWithWhereUniqueWithoutGrazeInput } from "../inputs/MobUpsertWithWhereUniqueWithoutGrazeInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobUpdateManyWithoutGrazeNestedInput", {
  isAbstract: true,
})
export class MobUpdateManyWithoutGrazeNestedInput {
  @TypeGraphQL.Field((_type) => [MobCreateWithoutGrazeInput], {
    nullable: true,
  })
  create?: MobCreateWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobCreateOrConnectWithoutGrazeInput], {
    nullable: true,
  })
  connectOrCreate?: MobCreateOrConnectWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobUpsertWithWhereUniqueWithoutGrazeInput], {
    nullable: true,
  })
  upsert?: MobUpsertWithWhereUniqueWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobWhereUniqueInput], {
    nullable: true,
  })
  set?: MobWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: MobWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobWhereUniqueInput], {
    nullable: true,
  })
  delete?: MobWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobWhereUniqueInput], {
    nullable: true,
  })
  connect?: MobWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobUpdateWithWhereUniqueWithoutGrazeInput], {
    nullable: true,
  })
  update?: MobUpdateWithWhereUniqueWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobUpdateManyWithWhereWithoutGrazeInput], {
    nullable: true,
  })
  updateMany?: MobUpdateManyWithWhereWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: MobScalarWhereInput[] | undefined;
}
