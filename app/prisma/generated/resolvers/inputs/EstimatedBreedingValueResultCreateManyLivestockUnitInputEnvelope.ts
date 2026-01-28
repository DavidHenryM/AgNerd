import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateManyLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateManyLivestockUnitInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope",
  {},
)
export class EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultCreateManyLivestockUnitInput],
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueResultCreateManyLivestockUnitInput[];
}
