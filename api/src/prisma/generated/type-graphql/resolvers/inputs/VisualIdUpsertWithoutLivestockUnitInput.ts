import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdCreateWithoutLivestockUnitInput } from "../inputs/VisualIdCreateWithoutLivestockUnitInput";
import { VisualIdUpdateWithoutLivestockUnitInput } from "../inputs/VisualIdUpdateWithoutLivestockUnitInput";

@TypeGraphQL.InputType("VisualIdUpsertWithoutLivestockUnitInput", {
  isAbstract: true
})
export class VisualIdUpsertWithoutLivestockUnitInput {
  @TypeGraphQL.Field(_type => VisualIdUpdateWithoutLivestockUnitInput, {
    nullable: false
  })
  update!: VisualIdUpdateWithoutLivestockUnitInput;

  @TypeGraphQL.Field(_type => VisualIdCreateWithoutLivestockUnitInput, {
    nullable: false
  })
  create!: VisualIdCreateWithoutLivestockUnitInput;
}
