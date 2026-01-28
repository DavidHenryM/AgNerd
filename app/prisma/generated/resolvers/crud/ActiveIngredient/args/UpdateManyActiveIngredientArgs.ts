import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientUpdateManyMutationInput } from "../../../inputs/ActiveIngredientUpdateManyMutationInput";
import { ActiveIngredientWhereInput } from "../../../inputs/ActiveIngredientWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientUpdateManyMutationInput, {
    nullable: false,
  })
  data!: ActiveIngredientUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  where?: ActiveIngredientWhereInput | undefined;
}
