import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateOrConnectWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateOrConnectWithoutLivestockUnitPositionInput";
import { PaddockCreateWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateWithoutLivestockUnitPositionInput";
import { PaddockUpdateWithoutLivestockUnitPositionInput } from "../inputs/PaddockUpdateWithoutLivestockUnitPositionInput";
import { PaddockUpsertWithoutLivestockUnitPositionInput } from "../inputs/PaddockUpsertWithoutLivestockUnitPositionInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType(
  "PaddockUpdateOneWithoutLivestockUnitPositionNestedInput",
  {
    isAbstract: true,
  }
)
export class PaddockUpdateOneWithoutLivestockUnitPositionNestedInput {
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

  @TypeGraphQL.Field(
    (_type) => PaddockUpsertWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  upsert?: PaddockUpsertWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: true,
  })
  connect?: PaddockWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpdateWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  update?: PaddockUpdateWithoutLivestockUnitPositionInput | undefined;
}
