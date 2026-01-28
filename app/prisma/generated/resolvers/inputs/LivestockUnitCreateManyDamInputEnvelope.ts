import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManyDamInput } from "../inputs/LivestockUnitCreateManyDamInput";

@TypeGraphQL.InputType("LivestockUnitCreateManyDamInputEnvelope", {})
export class LivestockUnitCreateManyDamInputEnvelope {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateManyDamInput], {
    nullable: false,
  })
  data!: LivestockUnitCreateManyDamInput[];
}
