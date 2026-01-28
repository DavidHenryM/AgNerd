import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultScalarWhereInput } from "../inputs/EstimatedBreedingValueResultScalarWhereInput";
import { EstimatedBreedingValueResultUpdateManyMutationInput } from "../inputs/EstimatedBreedingValueResultUpdateManyMutationInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpdateManyWithWhereWithoutEbvInput",
  {},
)
export class EstimatedBreedingValueResultUpdateManyWithWhereWithoutEbvInput {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultScalarWhereInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultScalarWhereInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultUpdateManyMutationInput,
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueResultUpdateManyMutationInput;
}
