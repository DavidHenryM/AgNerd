import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdCreateOrConnectWithoutLivestockUnitInput } from "../inputs/VisualIdCreateOrConnectWithoutLivestockUnitInput";
import { VisualIdCreateWithoutLivestockUnitInput } from "../inputs/VisualIdCreateWithoutLivestockUnitInput";
import { VisualIdUpdateWithoutLivestockUnitInput } from "../inputs/VisualIdUpdateWithoutLivestockUnitInput";
import { VisualIdUpsertWithoutLivestockUnitInput } from "../inputs/VisualIdUpsertWithoutLivestockUnitInput";
import { VisualIdWhereUniqueInput } from "../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.InputType("VisualIdUpdateOneWithoutLivestockUnitNestedInput", {
  isAbstract: true,
})
export class VisualIdUpdateOneWithoutLivestockUnitNestedInput {
  @TypeGraphQL.Field((_type) => VisualIdCreateWithoutLivestockUnitInput, {
    nullable: true,
  })
  create?: VisualIdCreateWithoutLivestockUnitInput | undefined;

  @TypeGraphQL.Field(
    (_type) => VisualIdCreateOrConnectWithoutLivestockUnitInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | VisualIdCreateOrConnectWithoutLivestockUnitInput
    | undefined;

  @TypeGraphQL.Field((_type) => VisualIdUpsertWithoutLivestockUnitInput, {
    nullable: true,
  })
  upsert?: VisualIdUpsertWithoutLivestockUnitInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => VisualIdWhereUniqueInput, {
    nullable: true,
  })
  connect?: VisualIdWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => VisualIdUpdateWithoutLivestockUnitInput, {
    nullable: true,
  })
  update?: VisualIdUpdateWithoutLivestockUnitInput | undefined;
}
