import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateOrConnectWithoutPregnancyTestInput } from "../inputs/PregnancyCreateOrConnectWithoutPregnancyTestInput";
import { PregnancyCreateWithoutPregnancyTestInput } from "../inputs/PregnancyCreateWithoutPregnancyTestInput";
import { PregnancyUpdateToOneWithWhereWithoutPregnancyTestInput } from "../inputs/PregnancyUpdateToOneWithWhereWithoutPregnancyTestInput";
import { PregnancyUpsertWithoutPregnancyTestInput } from "../inputs/PregnancyUpsertWithoutPregnancyTestInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType(
  "PregnancyUpdateOneRequiredWithoutPregnancyTestNestedInput",
  {},
)
export class PregnancyUpdateOneRequiredWithoutPregnancyTestNestedInput {
  @TypeGraphQL.Field((_type) => PregnancyCreateWithoutPregnancyTestInput, {
    nullable: true,
  })
  create?: PregnancyCreateWithoutPregnancyTestInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PregnancyCreateOrConnectWithoutPregnancyTestInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | PregnancyCreateOrConnectWithoutPregnancyTestInput
    | undefined;

  @TypeGraphQL.Field((_type) => PregnancyUpsertWithoutPregnancyTestInput, {
    nullable: true,
  })
  upsert?: PregnancyUpsertWithoutPregnancyTestInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: true,
  })
  connect?: PregnancyWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PregnancyUpdateToOneWithWhereWithoutPregnancyTestInput,
    {
      nullable: true,
    },
  )
  update?: PregnancyUpdateToOneWithWhereWithoutPregnancyTestInput | undefined;
}
