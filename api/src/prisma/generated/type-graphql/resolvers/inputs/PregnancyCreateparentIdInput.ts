import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("PregnancyCreateparentIdInput", {
  isAbstract: true,
})
export class PregnancyCreateparentIdInput {
  @TypeGraphQL.Field((_type) => [String], {
    nullable: false,
  })
  set!: string[];
}
