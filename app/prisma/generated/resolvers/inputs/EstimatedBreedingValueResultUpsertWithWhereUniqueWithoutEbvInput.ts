import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutEbvInput";
import { EstimatedBreedingValueResultUpdateWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultUpdateWithoutEbvInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutEbvInput",
  {},
)
export class EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutEbvInput {
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
  update!: EstimatedBreedingValueResultUpdateWithoutEbvInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCreateWithoutEbvInput,
    {
      nullable: false,
    },
  )
  create!: EstimatedBreedingValueResultCreateWithoutEbvInput;
}
