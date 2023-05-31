import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateOrConnectWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateOrConnectWithoutLivestockUnitPositionInput";
import { PaddockCreateWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateWithoutLivestockUnitPositionInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType(
  "PaddockCreateNestedOneWithoutLivestockUnitPositionInput",
  {
    isAbstract: true,
  }
)
export class PaddockCreateNestedOneWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field(
    (_type) => PaddockCreateWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  create?: PaddockCreateWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockCreateOrConnectWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | PaddockCreateOrConnectWithoutLivestockUnitPositionInput
    | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: true,
  })
  connect?: PaddockWhereUniqueInput | undefined;
}
