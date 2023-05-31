import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateOrConnectWithoutGrazeInput } from "../inputs/PaddockCreateOrConnectWithoutGrazeInput";
import { PaddockCreateWithoutGrazeInput } from "../inputs/PaddockCreateWithoutGrazeInput";
import { PaddockUpdateWithoutGrazeInput } from "../inputs/PaddockUpdateWithoutGrazeInput";
import { PaddockUpsertWithoutGrazeInput } from "../inputs/PaddockUpsertWithoutGrazeInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType("PaddockUpdateOneRequiredWithoutGrazeNestedInput", {
  isAbstract: true,
})
export class PaddockUpdateOneRequiredWithoutGrazeNestedInput {
  @TypeGraphQL.Field((_type) => PaddockCreateWithoutGrazeInput, {
    nullable: true,
  })
  create?: PaddockCreateWithoutGrazeInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockCreateOrConnectWithoutGrazeInput, {
    nullable: true,
  })
  connectOrCreate?: PaddockCreateOrConnectWithoutGrazeInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockUpsertWithoutGrazeInput, {
    nullable: true,
  })
  upsert?: PaddockUpsertWithoutGrazeInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: true,
  })
  connect?: PaddockWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => PaddockUpdateWithoutGrazeInput, {
    nullable: true,
  })
  update?: PaddockUpdateWithoutGrazeInput | undefined;
}
