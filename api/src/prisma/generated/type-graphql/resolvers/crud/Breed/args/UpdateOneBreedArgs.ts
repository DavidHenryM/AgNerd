import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedUpdateInput } from "../../../inputs/BreedUpdateInput";
import { BreedWhereUniqueInput } from "../../../inputs/BreedWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneBreedArgs {
  @TypeGraphQL.Field((_type) => BreedUpdateInput, {
    nullable: false,
  })
  data!: BreedUpdateInput;

  @TypeGraphQL.Field((_type) => BreedWhereUniqueInput, {
    nullable: false,
  })
  where!: BreedWhereUniqueInput;
}
