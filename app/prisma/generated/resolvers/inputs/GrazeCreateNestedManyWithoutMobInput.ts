import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateOrConnectWithoutMobInput } from "../inputs/GrazeCreateOrConnectWithoutMobInput";
import { GrazeCreateWithoutMobInput } from "../inputs/GrazeCreateWithoutMobInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeCreateNestedManyWithoutMobInput", {})
export class GrazeCreateNestedManyWithoutMobInput {
  @TypeGraphQL.Field((_type) => [GrazeCreateWithoutMobInput], {
    nullable: true,
  })
  create?: GrazeCreateWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeCreateOrConnectWithoutMobInput], {
    nullable: true,
  })
  connectOrCreate?: GrazeCreateOrConnectWithoutMobInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeWhereUniqueInput], {
    nullable: true,
  })
  connect?: GrazeWhereUniqueInput[] | undefined;
}
