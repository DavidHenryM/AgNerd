import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestCreateManyPregnancyInputEnvelope } from "../inputs/PregnancyTestCreateManyPregnancyInputEnvelope";
import { PregnancyTestCreateOrConnectWithoutPregnancyInput } from "../inputs/PregnancyTestCreateOrConnectWithoutPregnancyInput";
import { PregnancyTestCreateWithoutPregnancyInput } from "../inputs/PregnancyTestCreateWithoutPregnancyInput";
import { PregnancyTestWhereUniqueInput } from "../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyTestCreateNestedManyWithoutPregnancyInput", {})
export class PregnancyTestCreateNestedManyWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => [PregnancyTestCreateWithoutPregnancyInput], {
    nullable: true,
  })
  create?: PregnancyTestCreateWithoutPregnancyInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyTestCreateOrConnectWithoutPregnancyInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | PregnancyTestCreateOrConnectWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestCreateManyPregnancyInputEnvelope, {
    nullable: true,
  })
  createMany?: PregnancyTestCreateManyPregnancyInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereUniqueInput], {
    nullable: true,
  })
  connect?: PregnancyTestWhereUniqueInput[] | undefined;
}
