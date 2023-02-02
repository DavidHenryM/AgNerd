import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateWithoutLivestockUnitPositionInput";
import { PaddockUpdateWithoutLivestockUnitPositionInput } from "../inputs/PaddockUpdateWithoutLivestockUnitPositionInput";

@TypeGraphQL.InputType("PaddockUpsertWithoutLivestockUnitPositionInput", {
  isAbstract: true
})
export class PaddockUpsertWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field(_type => PaddockUpdateWithoutLivestockUnitPositionInput, {
    nullable: false
  })
  update!: PaddockUpdateWithoutLivestockUnitPositionInput;

  @TypeGraphQL.Field(_type => PaddockCreateWithoutLivestockUnitPositionInput, {
    nullable: false
  })
  create!: PaddockCreateWithoutLivestockUnitPositionInput;
}
