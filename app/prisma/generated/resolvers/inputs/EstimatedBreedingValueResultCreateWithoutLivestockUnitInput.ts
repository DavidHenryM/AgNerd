import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCreateNestedOneWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateNestedOneWithoutResultsInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateWithoutLivestockUnitInput",
  {},
)
export class EstimatedBreedingValueResultCreateWithoutLivestockUnitInput {
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
      EstimatedBreedingValueDefinitionCreateNestedOneWithoutResultsInput,
    {
      nullable: false,
    },
  )
  ebv!: EstimatedBreedingValueDefinitionCreateNestedOneWithoutResultsInput;
}
