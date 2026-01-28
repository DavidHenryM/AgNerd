import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManySireInput } from "../inputs/LivestockUnitCreateManySireInput";

@TypeGraphQL.InputType("LivestockUnitCreateManySireInputEnvelope", {})
export class LivestockUnitCreateManySireInputEnvelope {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateManySireInput], {
    nullable: false,
  })
  data!: LivestockUnitCreateManySireInput[];
}
