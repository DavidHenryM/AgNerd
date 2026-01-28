import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { LivestockUnitUpdateOneRequiredWithoutEstimatedBreedingValueResultNestedInput } from "../inputs/LivestockUnitUpdateOneRequiredWithoutEstimatedBreedingValueResultNestedInput";

@TypeGraphQL.InputType("EstimatedBreedingValueResultUpdateWithoutEbvInput", {})
export class EstimatedBreedingValueResultUpdateWithoutEbvInput {
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
      LivestockUnitUpdateOneRequiredWithoutEstimatedBreedingValueResultNestedInput,
    {
      nullable: true,
    },
  )
  livestockUnit?:
    | LivestockUnitUpdateOneRequiredWithoutEstimatedBreedingValueResultNestedInput
    | undefined;
}
