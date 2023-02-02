import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { GeoPoint } from "../models/GeoPoint";
import { Paddock } from "../models/Paddock";

@TypeGraphQL.ObjectType("LivestockUnitPosition", {
  isAbstract: true
})
export class LivestockUnitPosition {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  date!: Date;

  location?: GeoPoint | null;

  paddock?: Paddock | null;
}
