import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreatemobIdsInput } from "../inputs/GrazeCreatemobIdsInput";
import { MobCreateNestedManyWithoutGrazeInput } from "../inputs/MobCreateNestedManyWithoutGrazeInput";
import { PaddockCreateNestedOneWithoutGrazeInput } from "../inputs/PaddockCreateNestedOneWithoutGrazeInput";

@TypeGraphQL.InputType("GrazeCreateInput", {
  isAbstract: true
})
export class GrazeCreateInput {
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

  @TypeGraphQL.Field(_type => MobCreateNestedManyWithoutGrazeInput, {
    nullable: true
  })
  mob?: MobCreateNestedManyWithoutGrazeInput | undefined;
}
