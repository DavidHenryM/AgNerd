import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultOrderByWithRelationInput } from "../../../inputs/EstimatedBreedingValueResultOrderByWithRelationInput";
import { EstimatedBreedingValueResultWhereInput } from "../../../inputs/EstimatedBreedingValueResultWhereInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueResultWhereUniqueInput";
import { EstimatedBreedingValueResultScalarFieldEnum } from "../../../../enums/EstimatedBreedingValueResultScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueResultWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultOrderByWithRelationInput],
    {
      nullable: true,
    },
  )
  orderBy?: EstimatedBreedingValueResultOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: true,
  })
  cursor?: EstimatedBreedingValueResultWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueResultScalarFieldEnum], {
    nullable: true,
  })
  distinct?:
    | Array<
        | "id"
        | "estimatedBreedingValueDefinitionId"
        | "value"
        | "percentile"
        | "accuracy"
        | "livestockUnitId"
      >
    | undefined;
}
