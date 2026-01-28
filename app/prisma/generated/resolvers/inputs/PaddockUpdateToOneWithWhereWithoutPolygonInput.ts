import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockUpdateWithoutPolygonInput } from "../inputs/PaddockUpdateWithoutPolygonInput";
import { PaddockWhereInput } from "../inputs/PaddockWhereInput";

@TypeGraphQL.InputType("PaddockUpdateToOneWithWhereWithoutPolygonInput", {})
export class PaddockUpdateToOneWithWhereWithoutPolygonInput {
  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  where?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockUpdateWithoutPolygonInput, {
    nullable: false,
  })
  data!: PaddockUpdateWithoutPolygonInput;
}
