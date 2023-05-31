import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateOrConnectWithoutPregnancyTestInput } from "../inputs/PregnancyCreateOrConnectWithoutPregnancyTestInput";
import { PregnancyCreateWithoutPregnancyTestInput } from "../inputs/PregnancyCreateWithoutPregnancyTestInput";
import { PregnancyUpdateWithoutPregnancyTestInput } from "../inputs/PregnancyUpdateWithoutPregnancyTestInput";
import { PregnancyUpsertWithoutPregnancyTestInput } from "../inputs/PregnancyUpsertWithoutPregnancyTestInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType(
  "PregnancyUpdateOneRequiredWithoutPregnancyTestNestedInput",
  {
    isAbstract: true,
  }
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
    }
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

  @TypeGraphQL.Field((_type) => PregnancyUpdateWithoutPregnancyTestInput, {
    nullable: true,
  })
  update?: PregnancyUpdateWithoutPregnancyTestInput | undefined;
}
