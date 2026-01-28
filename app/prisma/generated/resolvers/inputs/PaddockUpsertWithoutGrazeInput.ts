import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutGrazeInput } from "../inputs/PaddockCreateWithoutGrazeInput";
import { PaddockUpdateWithoutGrazeInput } from "../inputs/PaddockUpdateWithoutGrazeInput";
import { PaddockWhereInput } from "../inputs/PaddockWhereInput";

@TypeGraphQL.InputType("PaddockUpsertWithoutGrazeInput", {})
export class PaddockUpsertWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => PaddockUpdateWithoutGrazeInput, {
    nullable: false,
  })
  update!: PaddockUpdateWithoutGrazeInput;

  @TypeGraphQL.Field((_type) => PaddockCreateWithoutGrazeInput, {
    nullable: false,
  })
  create!: PaddockCreateWithoutGrazeInput;

  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  where?: PaddockWhereInput | undefined;
}
