import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdCreateOrConnectWithoutLivestockUnitInput } from "../inputs/VisualIdCreateOrConnectWithoutLivestockUnitInput";
import { VisualIdCreateWithoutLivestockUnitInput } from "../inputs/VisualIdCreateWithoutLivestockUnitInput";
import { VisualIdWhereUniqueInput } from "../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.InputType("VisualIdCreateNestedOneWithoutLivestockUnitInput", {
  isAbstract: true,
})
export class VisualIdCreateNestedOneWithoutLivestockUnitInput {
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

  @TypeGraphQL.Field((_type) => VisualIdWhereUniqueInput, {
    nullable: true,
  })
  connect?: VisualIdWhereUniqueInput | undefined;
}
