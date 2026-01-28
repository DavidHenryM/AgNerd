import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionOrderByWithRelationInput } from "../../../inputs/EstimatedBreedingValueDefinitionOrderByWithRelationInput";
import { EstimatedBreedingValueDefinitionWhereInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereInput";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";
import { EstimatedBreedingValueDefinitionScalarFieldEnum } from "../../../../enums/EstimatedBreedingValueDefinitionScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueDefinitionWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionOrderByWithRelationInput],
    {
      nullable: true,
    },
  )
  orderBy?:
    | EstimatedBreedingValueDefinitionOrderByWithRelationInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: true,
    },
  )
  cursor?: EstimatedBreedingValueDefinitionWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionScalarFieldEnum],
    {
      nullable: true,
    },
  )
  distinct?:
    | Array<
        | "id"
        | "name"
        | "code"
        | "category"
        | "description"
        | "higherIsBetter"
        | "units"
        | "measurement"
        | "angusTechFieldNameValue"
        | "angusTechFieldNamePercentile"
        | "angusTechFieldNameAccuracy"
      >
    | undefined;
}
