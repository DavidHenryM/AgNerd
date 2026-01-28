import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutEbvInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput",
  {},
)
export class EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCreateWithoutEbvInput,
    {
      nullable: false,
    },
  )
  create!: EstimatedBreedingValueResultCreateWithoutEbvInput;
}
