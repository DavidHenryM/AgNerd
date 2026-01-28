import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateOrConnectWithoutParentsInput } from "../inputs/PregnancyCreateOrConnectWithoutParentsInput";
import { PregnancyCreateWithoutParentsInput } from "../inputs/PregnancyCreateWithoutParentsInput";
import { PregnancyScalarWhereInput } from "../inputs/PregnancyScalarWhereInput";
import { PregnancyUpdateManyWithWhereWithoutParentsInput } from "../inputs/PregnancyUpdateManyWithWhereWithoutParentsInput";
import { PregnancyUpdateWithWhereUniqueWithoutParentsInput } from "../inputs/PregnancyUpdateWithWhereUniqueWithoutParentsInput";
import { PregnancyUpsertWithWhereUniqueWithoutParentsInput } from "../inputs/PregnancyUpsertWithWhereUniqueWithoutParentsInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyUpdateManyWithoutParentsNestedInput", {})
export class PregnancyUpdateManyWithoutParentsNestedInput {
  @TypeGraphQL.Field((_type) => [PregnancyCreateWithoutParentsInput], {
    nullable: true,
  })
  create?: PregnancyCreateWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyCreateOrConnectWithoutParentsInput], {
    nullable: true,
  })
  connectOrCreate?: PregnancyCreateOrConnectWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyUpsertWithWhereUniqueWithoutParentsInput],
    {
      nullable: true,
    },
  )
  upsert?: PregnancyUpsertWithWhereUniqueWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereUniqueInput], {
    nullable: true,
  })
  set?: PregnancyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: PregnancyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereUniqueInput], {
    nullable: true,
  })
  delete?: PregnancyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereUniqueInput], {
    nullable: true,
  })
  connect?: PregnancyWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyUpdateWithWhereUniqueWithoutParentsInput],
    {
      nullable: true,
    },
  )
  update?: PregnancyUpdateWithWhereUniqueWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyUpdateManyWithWhereWithoutParentsInput],
    {
      nullable: true,
    },
  )
  updateMany?: PregnancyUpdateManyWithWhereWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: PregnancyScalarWhereInput[] | undefined;
}
