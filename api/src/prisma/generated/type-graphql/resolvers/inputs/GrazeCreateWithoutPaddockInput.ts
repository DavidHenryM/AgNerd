import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateNestedManyWithoutGrazeInput } from "../inputs/MobCreateNestedManyWithoutGrazeInput";

@TypeGraphQL.InputType("GrazeCreateWithoutPaddockInput", {
  isAbstract: true,
})
export class GrazeCreateWithoutPaddockInput {
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

  @TypeGraphQL.Field((_type) => MobCreateNestedManyWithoutGrazeInput, {
    nullable: true,
  })
  mob?: MobCreateNestedManyWithoutGrazeInput | undefined;
}
