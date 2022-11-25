import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Mob } from "../models/Mob";
import { Paddock } from "../models/Paddock";
import { GrazeCount } from "../resolvers/outputs/GrazeCount";

@TypeGraphQL.ObjectType("Graze", {
  isAbstract: true
})
export class Graze {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startDatetime!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endDateTime?: Date | null;

  paddock?: Paddock;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  paddockId!: string;

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  mobIds!: string[];

  mob?: Mob[];

  @TypeGraphQL.Field(_type => GrazeCount, {
    nullable: true
  })
  _count?: GrazeCount | null;
}
