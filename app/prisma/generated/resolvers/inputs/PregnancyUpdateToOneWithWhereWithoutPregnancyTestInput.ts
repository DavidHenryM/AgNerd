import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyUpdateWithoutPregnancyTestInput } from "../inputs/PregnancyUpdateWithoutPregnancyTestInput";
import { PregnancyWhereInput } from "../inputs/PregnancyWhereInput";

@TypeGraphQL.InputType(
  "PregnancyUpdateToOneWithWhereWithoutPregnancyTestInput",
  {},
)
export class PregnancyUpdateToOneWithWhereWithoutPregnancyTestInput {
  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  where?: PregnancyWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyUpdateWithoutPregnancyTestInput, {
    nullable: false,
  })
  data!: PregnancyUpdateWithoutPregnancyTestInput;
}
