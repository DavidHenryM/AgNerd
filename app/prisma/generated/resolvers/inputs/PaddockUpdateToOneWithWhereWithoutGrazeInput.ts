import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockUpdateWithoutGrazeInput } from "../inputs/PaddockUpdateWithoutGrazeInput";
import { PaddockWhereInput } from "../inputs/PaddockWhereInput";

@TypeGraphQL.InputType("PaddockUpdateToOneWithWhereWithoutGrazeInput", {})
export class PaddockUpdateToOneWithWhereWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  where?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockUpdateWithoutGrazeInput, {
    nullable: false,
  })
  data!: PaddockUpdateWithoutGrazeInput;
}
