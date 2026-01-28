import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateWithoutLivestockUnitPositionInput";
import { PaddockWhereUniqueInput } from "../inputs/PaddockWhereUniqueInput";

@TypeGraphQL.InputType(
  "PaddockCreateOrConnectWithoutLivestockUnitPositionInput",
  {},
)
export class PaddockCreateOrConnectWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field((_type) => PaddockWhereUniqueInput, {
    nullable: false,
  })
  where!: PaddockWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => PaddockCreateWithoutLivestockUnitPositionInput,
    {
      nullable: false,
    },
  )
  create!: PaddockCreateWithoutLivestockUnitPositionInput;
}
