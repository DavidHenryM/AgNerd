import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateOrConnectWithoutPolygonInput } from "../inputs/PaddockCreateOrConnectWithoutPolygonInput";
import { PaddockCreateWithoutPolygonInput } from "../inputs/PaddockCreateWithoutPolygonInput";
import { PaddockUpdateWithoutPolygonInput } from "../inputs/PaddockUpdateWithoutPolygonInput";
import { PaddockUpsertWithoutPolygonInput } from "../inputs/PaddockUpsertWithoutPolygonInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType("PaddockUpdateOneRequiredWithoutPolygonNestedInput", {
  isAbstract: true
})
export class PaddockUpdateOneRequiredWithoutPolygonNestedInput {
  @TypeGraphQL.Field(_type => PaddockCreateWithoutPolygonInput, {
    nullable: true
  })
  create?: PaddockCreateWithoutPolygonInput | undefined;

  @TypeGraphQL.Field(_type => PaddockCreateOrConnectWithoutPolygonInput, {
    nullable: true
  })
  connectOrCreate?: PaddockCreateOrConnectWithoutPolygonInput | undefined;

  @TypeGraphQL.Field(_type => PaddockUpsertWithoutPolygonInput, {
    nullable: true
  })
  upsert?: PaddockUpsertWithoutPolygonInput | undefined;

  @TypeGraphQL.Field(_type => PaddockWhereUniqueInput, {
    nullable: true
  })
  connect?: PaddockWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => PaddockUpdateWithoutPolygonInput, {
    nullable: true
  })
  update?: PaddockUpdateWithoutPolygonInput | undefined;
}
