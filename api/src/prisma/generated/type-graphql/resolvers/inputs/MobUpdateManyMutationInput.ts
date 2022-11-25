import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobUpdategrazeIdsInput } from "../inputs/MobUpdategrazeIdsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("MobUpdateManyMutationInput", {
  isAbstract: true
})
export class MobUpdateManyMutationInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  comment?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => MobUpdategrazeIdsInput, {
    nullable: true
  })
  grazeIds?: MobUpdategrazeIdsInput | undefined;
}
