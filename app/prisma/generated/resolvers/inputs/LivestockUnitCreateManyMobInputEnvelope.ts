import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManyMobInput } from "../inputs/LivestockUnitCreateManyMobInput";

@TypeGraphQL.InputType("LivestockUnitCreateManyMobInputEnvelope", {})
export class LivestockUnitCreateManyMobInputEnvelope {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateManyMobInput], {
    nullable: false,
  })
  data!: LivestockUnitCreateManyMobInput[];
}
