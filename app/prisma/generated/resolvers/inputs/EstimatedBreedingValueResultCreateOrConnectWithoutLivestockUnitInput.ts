import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput",
  {},
)
export class EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCreateWithoutLivestockUnitInput,
    {
      nullable: false,
    },
  )
  create!: EstimatedBreedingValueResultCreateWithoutLivestockUnitInput;
}
