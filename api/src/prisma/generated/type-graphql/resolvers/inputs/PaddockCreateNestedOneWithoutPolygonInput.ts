import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateOrConnectWithoutPolygonInput } from "../inputs/PaddockCreateOrConnectWithoutPolygonInput";
import { PaddockCreateWithoutPolygonInput } from "../inputs/PaddockCreateWithoutPolygonInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType("PaddockCreateNestedOneWithoutPolygonInput", {
  isAbstract: true,
})
export class PaddockCreateNestedOneWithoutPolygonInput {
  @TypeGraphQL.Field((_type) => PaddockCreateWithoutPolygonInput, {
    nullable: true,
  })
  create?: PaddockCreateWithoutPolygonInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockCreateOrConnectWithoutPolygonInput, {
    nullable: true,
  })
  connectOrCreate?: PaddockCreateOrConnectWithoutPolygonInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: true,
  })
  connect?: PaddockWhereUniqueInput | undefined;
}
