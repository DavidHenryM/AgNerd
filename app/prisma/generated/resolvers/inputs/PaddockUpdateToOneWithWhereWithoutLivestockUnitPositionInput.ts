import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockUpdateWithoutLivestockUnitPositionInput } from "../inputs/PaddockUpdateWithoutLivestockUnitPositionInput";
import { PaddockWhereInput } from "../inputs/PaddockWhereInput";

@TypeGraphQL.InputType(
  "PaddockUpdateToOneWithWhereWithoutLivestockUnitPositionInput",
  {},
)
export class PaddockUpdateToOneWithWhereWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field((_type) => PaddockWhereInput, {
    nullable: true,
  })
  where?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpdateWithoutLivestockUnitPositionInput,
    {
      nullable: false,
    },
  )
  data!: PaddockUpdateWithoutLivestockUnitPositionInput;
}
