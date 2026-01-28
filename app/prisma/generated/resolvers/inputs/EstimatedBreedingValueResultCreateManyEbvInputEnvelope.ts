import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateManyEbvInput } from "../inputs/EstimatedBreedingValueResultCreateManyEbvInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateManyEbvInputEnvelope",
  {},
)
export class EstimatedBreedingValueResultCreateManyEbvInputEnvelope {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultCreateManyEbvInput],
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueResultCreateManyEbvInput[];
}
