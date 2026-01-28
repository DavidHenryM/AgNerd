import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestCreateManyPregnancyInput } from "../inputs/PregnancyTestCreateManyPregnancyInput";

@TypeGraphQL.InputType("PregnancyTestCreateManyPregnancyInputEnvelope", {})
export class PregnancyTestCreateManyPregnancyInputEnvelope {
  @TypeGraphQL.Field((_type) => [PregnancyTestCreateManyPregnancyInput], {
    nullable: false,
  })
  data!: PregnancyTestCreateManyPregnancyInput[];
}
