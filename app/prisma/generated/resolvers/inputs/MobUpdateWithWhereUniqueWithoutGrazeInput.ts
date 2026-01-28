import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobUpdateWithoutGrazeInput } from "../inputs/MobUpdateWithoutGrazeInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobUpdateWithWhereUniqueWithoutGrazeInput", {})
export class MobUpdateWithWhereUniqueWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: false,
  })
  where!: MobWhereUniqueInput;

  @TypeGraphQL.Field((_type) => MobUpdateWithoutGrazeInput, {
    nullable: false,
  })
  data!: MobUpdateWithoutGrazeInput;
}
