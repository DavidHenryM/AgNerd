import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("GrazeMinAggregate", {
  isAbstract: true
})
export class GrazeMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startDatetime!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endDateTime!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  paddockId!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  dseDaysPerHectare!: number | null;
}
