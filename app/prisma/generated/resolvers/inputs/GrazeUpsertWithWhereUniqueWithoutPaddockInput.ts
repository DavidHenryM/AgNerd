import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateWithoutPaddockInput } from "../inputs/GrazeCreateWithoutPaddockInput";
import { GrazeUpdateWithoutPaddockInput } from "../inputs/GrazeUpdateWithoutPaddockInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeUpsertWithWhereUniqueWithoutPaddockInput", {})
export class GrazeUpsertWithWhereUniqueWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => GrazeWhereUniqueInput, {
    nullable: false,
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GrazeUpdateWithoutPaddockInput, {
    nullable: false,
  })
  update!: GrazeUpdateWithoutPaddockInput;

  @TypeGraphQL.Field((_type) => GrazeCreateWithoutPaddockInput, {
    nullable: false,
  })
  create!: GrazeCreateWithoutPaddockInput;
}
