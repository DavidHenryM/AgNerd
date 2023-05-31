import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateWithoutMobInput } from "../inputs/GrazeCreateWithoutMobInput";
import { GrazeUpdateWithoutMobInput } from "../inputs/GrazeUpdateWithoutMobInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeUpsertWithWhereUniqueWithoutMobInput", {
  isAbstract: true,
})
export class GrazeUpsertWithWhereUniqueWithoutMobInput {
  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: false,
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GrazeUpdateWithoutMobInput, {
    nullable: false,
  })
  update!: GrazeUpdateWithoutMobInput;

  @TypeGraphQL.Field((_type) => GrazeCreateWithoutMobInput, {
    nullable: false,
  })
  create!: GrazeCreateWithoutMobInput;
}
