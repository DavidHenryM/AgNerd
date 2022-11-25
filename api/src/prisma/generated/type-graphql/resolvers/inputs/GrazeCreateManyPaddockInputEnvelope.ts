import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateManyPaddockInput } from "../inputs/GrazeCreateManyPaddockInput";

@TypeGraphQL.InputType("GrazeCreateManyPaddockInputEnvelope", {
  isAbstract: true
})
export class GrazeCreateManyPaddockInputEnvelope {
  @TypeGraphQL.Field(_type => [GrazeCreateManyPaddockInput], {
    nullable: false
  })
  data!: GrazeCreateManyPaddockInput[];
}
