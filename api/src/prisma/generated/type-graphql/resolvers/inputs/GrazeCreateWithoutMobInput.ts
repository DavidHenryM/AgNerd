import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreatemobIdsInput } from "../inputs/GrazeCreatemobIdsInput";
import { PaddockCreateNestedOneWithoutGrazeInput } from "../inputs/PaddockCreateNestedOneWithoutGrazeInput";

@TypeGraphQL.InputType("GrazeCreateWithoutMobInput", {
  isAbstract: true
})
export class GrazeCreateWithoutMobInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startDatetime!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endDateTime?: Date | undefined;

  @TypeGraphQL.Field(_type => PaddockCreateNestedOneWithoutGrazeInput, {
    nullable: false
  })
  paddock!: PaddockCreateNestedOneWithoutGrazeInput;

  @TypeGraphQL.Field(_type => GrazeCreatemobIdsInput, {
    nullable: true
  })
  mobIds?: GrazeCreatemobIdsInput | undefined;
}
