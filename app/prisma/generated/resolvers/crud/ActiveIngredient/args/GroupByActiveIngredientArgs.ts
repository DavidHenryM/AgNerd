import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientOrderByWithAggregationInput } from "../../../inputs/ActiveIngredientOrderByWithAggregationInput";
import { ActiveIngredientScalarWhereWithAggregatesInput } from "../../../inputs/ActiveIngredientScalarWhereWithAggregatesInput";
import { ActiveIngredientWhereInput } from "../../../inputs/ActiveIngredientWhereInput";
import { ActiveIngredientScalarFieldEnum } from "../../../../enums/ActiveIngredientScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  where?: ActiveIngredientWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: ActiveIngredientOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ActiveIngredientScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<"id" | "ingredient" | "mgPermL" | "productId">;

  @TypeGraphQL.Field(
    (_type) => ActiveIngredientScalarWhereWithAggregatesInput,
    {
      nullable: true,
    },
  )
  having?: ActiveIngredientScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
