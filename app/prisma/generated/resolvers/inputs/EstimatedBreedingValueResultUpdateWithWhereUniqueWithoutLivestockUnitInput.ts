import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutLivestockUnitInput",
  {},
)
export class EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput,
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput;
}
