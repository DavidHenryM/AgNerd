import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultUpdateWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultUpdateWithoutEbvInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutEbvInput",
  {},
)
export class EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutEbvInput {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultUpdateWithoutEbvInput,
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueResultUpdateWithoutEbvInput;
}
