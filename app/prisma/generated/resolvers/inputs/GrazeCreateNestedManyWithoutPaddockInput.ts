import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateManyPaddockInputEnvelope } from "../inputs/GrazeCreateManyPaddockInputEnvelope";
import { GrazeCreateOrConnectWithoutPaddockInput } from "../inputs/GrazeCreateOrConnectWithoutPaddockInput";
import { GrazeCreateWithoutPaddockInput } from "../inputs/GrazeCreateWithoutPaddockInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeCreateNestedManyWithoutPaddockInput", {})
export class GrazeCreateNestedManyWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => [GrazeCreateWithoutPaddockInput], {
    nullable: true,
  })
  create?: GrazeCreateWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeCreateOrConnectWithoutPaddockInput], {
    nullable: true,
  })
  connectOrCreate?: GrazeCreateOrConnectWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => GrazeCreateManyPaddockInputEnvelope, {
    nullable: true,
  })
  createMany?: GrazeCreateManyPaddockInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [GrazeWhereUniqueInput], {
    nullable: true,
  })
  connect?: GrazeWhereUniqueInput[] | undefined;
}
