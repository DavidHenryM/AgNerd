import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutPolygonInput } from "../inputs/PaddockCreateWithoutPolygonInput";
import { PaddockUpdateWithoutPolygonInput } from "../inputs/PaddockUpdateWithoutPolygonInput";

@TypeGraphQL.InputType("PaddockUpsertWithoutPolygonInput", {
  isAbstract: true,
})
export class PaddockUpsertWithoutPolygonInput {
  @TypeGraphQL.Field((_type) => PaddockUpdateWithoutPolygonInput, {
    nullable: false,
  })
  update!: PaddockUpdateWithoutPolygonInput;

  @TypeGraphQL.Field((_type) => PaddockCreateWithoutPolygonInput, {
    nullable: false,
  })
  create!: PaddockCreateWithoutPolygonInput;
}
