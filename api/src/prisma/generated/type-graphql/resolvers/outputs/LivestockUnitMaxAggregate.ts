import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Sex } from "../../enums/Sex";

@TypeGraphQL.ObjectType("LivestockUnitMaxAggregate", {
  isAbstract: true
})
export class LivestockUnitMaxAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  nlisid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comment!: string | null;

  @TypeGraphQL.Field(_type => Sex, {
    nullable: true
  })
  sex!: "MALE" | "FEMALE" | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  birthdate!: Date | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  desexed!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  parentId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  livestockUnitId!: string | null;
}
