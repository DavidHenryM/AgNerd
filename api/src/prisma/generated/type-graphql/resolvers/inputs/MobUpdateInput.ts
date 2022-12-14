import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeUpdateManyWithoutMobNestedInput } from "../inputs/GrazeUpdateManyWithoutMobNestedInput";
import { LivestockUnitUpdateManyWithoutMobNestedInput } from "../inputs/LivestockUnitUpdateManyWithoutMobNestedInput";
import { MobUpdategrazeIdsInput } from "../inputs/MobUpdategrazeIdsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("MobUpdateInput", {
  isAbstract: true
})
export class MobUpdateInput {
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

  @TypeGraphQL.Field(_type => GrazeUpdateManyWithoutMobNestedInput, {
    nullable: true
  })
  graze?: GrazeUpdateManyWithoutMobNestedInput | undefined;
}
