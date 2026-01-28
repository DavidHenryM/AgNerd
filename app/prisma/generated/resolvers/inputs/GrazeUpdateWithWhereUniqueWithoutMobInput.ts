import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeUpdateWithoutMobInput } from "../inputs/GrazeUpdateWithoutMobInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeUpdateWithWhereUniqueWithoutMobInput", {})
export class GrazeUpdateWithWhereUniqueWithoutMobInput {
  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: false,
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GrazeUpdateWithoutMobInput, {
    nullable: false,
  })
  data!: GrazeUpdateWithoutMobInput;
}
