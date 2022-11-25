import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateManyWithoutMobNestedInput } from "../inputs/LivestockUnitUpdateManyWithoutMobNestedInput";
import { MobUpdategrazeIdsInput } from "../inputs/MobUpdategrazeIdsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("MobUpdateWithoutGrazeInput", {
  isAbstract: true
})
export class MobUpdateWithoutGrazeInput {
  @TypeGraphQL.Field(_type => LivestockUnitUpdateManyWithoutMobNestedInput, {
    nullable: true
  })
  members?: LivestockUnitUpdateManyWithoutMobNestedInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  comment?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => MobUpdategrazeIdsInput, {
    nullable: true
  })
  grazeIds?: MobUpdategrazeIdsInput | undefined;
}
