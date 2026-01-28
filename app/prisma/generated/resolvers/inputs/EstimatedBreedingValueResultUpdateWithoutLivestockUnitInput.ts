import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionUpdateOneRequiredWithoutResultsNestedInput } from "../inputs/EstimatedBreedingValueDefinitionUpdateOneRequiredWithoutResultsNestedInput";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput",
  {},
)
export class EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  value?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  percentile?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  accuracy?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      EstimatedBreedingValueDefinitionUpdateOneRequiredWithoutResultsNestedInput,
    {
      nullable: true,
    },
  )
  ebv?:
    | EstimatedBreedingValueDefinitionUpdateOneRequiredWithoutResultsNestedInput
    | undefined;
}
