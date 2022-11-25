import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateManyPaddockInput } from "../inputs/GeoPointCreateManyPaddockInput";

@TypeGraphQL.InputType("GeoPointCreateManyPaddockInputEnvelope", {
  isAbstract: true
})
export class GeoPointCreateManyPaddockInputEnvelope {
  @TypeGraphQL.Field(_type => [GeoPointCreateManyPaddockInput], {
    nullable: false
  })
  data!: GeoPointCreateManyPaddockInput[];
}
