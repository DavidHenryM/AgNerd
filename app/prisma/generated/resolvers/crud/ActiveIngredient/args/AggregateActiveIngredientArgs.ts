import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientOrderByWithRelationInput } from "../../../inputs/ActiveIngredientOrderByWithRelationInput";
import { ActiveIngredientWhereInput } from "../../../inputs/ActiveIngredientWhereInput";
import { ActiveIngredientWhereUniqueInput } from "../../../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  where?: ActiveIngredientWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: ActiveIngredientOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientWhereUniqueInput, {
    nullable: true,
  })
  cursor?: ActiveIngredientWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
