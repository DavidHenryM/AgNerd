import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeUpdateManyWithoutMobNestedInput } from "../inputs/GrazeUpdateManyWithoutMobNestedInput";
import { LivestockUnitUpdateManyWithoutMobNestedInput } from "../inputs/LivestockUnitUpdateManyWithoutMobNestedInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("MobUpdateInput", {
  isAbstract: true,
})
export class MobUpdateInput {
  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  comment?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateManyWithoutMobNestedInput, {
    nullable: true,
  })
  members?: LivestockUnitUpdateManyWithoutMobNestedInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeUpdateManyWithoutMobNestedInput, {
    nullable: true,
  })
  graze?: GrazeUpdateManyWithoutMobNestedInput | undefined;
}
