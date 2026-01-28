import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutLivestockUnitInput",
  {},
)
export class EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutLivestockUnitInput {
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
  update!: EstimatedBreedingValueResultUpdateWithoutLivestockUnitInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCreateWithoutLivestockUnitInput,
    {
      nullable: false,
    },
  )
  create!: EstimatedBreedingValueResultCreateWithoutLivestockUnitInput;
}
