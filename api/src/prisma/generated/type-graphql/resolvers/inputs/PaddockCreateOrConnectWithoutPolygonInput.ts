import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutPolygonInput } from "../inputs/PaddockCreateWithoutPolygonInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType("PaddockCreateOrConnectWithoutPolygonInput", {
  isAbstract: true,
})
export class PaddockCreateOrConnectWithoutPolygonInput {
  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: false,
  })
  where!: PaddockWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PaddockCreateWithoutPolygonInput, {
    nullable: false,
  })
  create!: PaddockCreateWithoutPolygonInput;
}
