import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedOneWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateNestedOneWithoutEstimatedBreedingValueResultInput";

@TypeGraphQL.InputType("EstimatedBreedingValueResultCreateWithoutEbvInput", {})
export class EstimatedBreedingValueResultCreateWithoutEbvInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  value!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  percentile!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  accuracy!: number;

  @TypeGraphQL.Field(
    (_type) =>
      LivestockUnitCreateNestedOneWithoutEstimatedBreedingValueResultInput,
    {
      nullable: false,
    },
  )
  livestockUnit!: LivestockUnitCreateNestedOneWithoutEstimatedBreedingValueResultInput;
}
