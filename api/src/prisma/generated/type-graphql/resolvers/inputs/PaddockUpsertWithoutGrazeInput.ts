import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateWithoutGrazeInput } from "../inputs/PaddockCreateWithoutGrazeInput";
import { PaddockUpdateWithoutGrazeInput } from "../inputs/PaddockUpdateWithoutGrazeInput";

@TypeGraphQL.InputType("PaddockUpsertWithoutGrazeInput", {
  isAbstract: true
})
export class PaddockUpsertWithoutGrazeInput {
  @TypeGraphQL.Field(_type => PaddockUpdateWithoutGrazeInput, {
    nullable: false
  })
  update!: PaddockUpdateWithoutGrazeInput;

  @TypeGraphQL.Field(_type => PaddockCreateWithoutGrazeInput, {
    nullable: false
  })
  create!: PaddockCreateWithoutGrazeInput;
}
