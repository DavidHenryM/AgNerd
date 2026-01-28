import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateOrConnectWithoutPregnancyTestInput } from "../inputs/PregnancyCreateOrConnectWithoutPregnancyTestInput";
import { PregnancyCreateWithoutPregnancyTestInput } from "../inputs/PregnancyCreateWithoutPregnancyTestInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyCreateNestedOneWithoutPregnancyTestInput", {})
export class PregnancyCreateNestedOneWithoutPregnancyTestInput {
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

  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: true,
  })
  connect?: PregnancyWhereUniqueInput | undefined;
}
