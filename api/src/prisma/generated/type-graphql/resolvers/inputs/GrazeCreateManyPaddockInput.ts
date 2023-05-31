import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreatemobIdsInput } from "../inputs/GrazeCreatemobIdsInput";

@TypeGraphQL.InputType("GrazeCreateManyPaddockInput", {
  isAbstract: true,
})
export class GrazeCreateManyPaddockInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  startDatetime!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  endDateTime?: Date | undefined;

  @TypeGraphQL.Field((_type) => GrazeCreatemobIdsInput, {
    nullable: true,
  })
  mobIds?: GrazeCreatemobIdsInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  dseDaysPerHectare?: number | undefined;
}
