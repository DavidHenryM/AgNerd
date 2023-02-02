import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdCreateWithoutLivestockUnitInput } from "../inputs/VisualIdCreateWithoutLivestockUnitInput";
import { VisualIdWhereUniqueInput } from "../inputs/VisualIdWhereUniqueInput";

@TypeGraphQL.InputType("VisualIdCreateOrConnectWithoutLivestockUnitInput", {
  isAbstract: true
})
export class VisualIdCreateOrConnectWithoutLivestockUnitInput {
  @TypeGraphQL.Field(_type => VisualIdWhereUniqueInput, {
    nullable: false
  })
  where!: VisualIdWhereUniqueInput;

  @TypeGraphQL.Field(_type => VisualIdCreateWithoutLivestockUnitInput, {
    nullable: false
  })
  create!: VisualIdCreateWithoutLivestockUnitInput;
}
