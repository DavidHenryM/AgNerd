import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedUpdateManyMutationInput } from "../../../inputs/BreedUpdateManyMutationInput";
import { BreedWhereInput } from "../../../inputs/BreedWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyBreedArgs {
  @TypeGraphQL.Field(_type => BreedUpdateManyMutationInput, {
    nullable: false
  })
  data!: BreedUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => BreedWhereInput, {
    nullable: true
  })
  where?: BreedWhereInput | undefined;
}
