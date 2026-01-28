import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutGrazeInput } from "../inputs/PaddockCreateWithoutGrazeInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType("PaddockCreateOrConnectWithoutGrazeInput", {})
export class PaddockCreateOrConnectWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: false,
  })
  where!: PaddockWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PaddockCreateWithoutGrazeInput, {
    nullable: false,
  })
  create!: PaddockCreateWithoutGrazeInput;
}
