import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCreateNestedOneWithoutGrazeInput } from "../inputs/PaddockCreateNestedOneWithoutGrazeInput";

@TypeGraphQL.InputType("GrazeCreateWithoutMobInput", {})
export class GrazeCreateWithoutMobInput {
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

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  dseDaysPerHectare?: number | undefined;

  @TypeGraphQL.Field((_type) => PaddockCreateNestedOneWithoutGrazeInput, {
    nullable: false,
  })
  paddock!: PaddockCreateNestedOneWithoutGrazeInput;
}
