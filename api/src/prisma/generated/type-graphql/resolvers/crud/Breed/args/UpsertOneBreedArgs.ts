import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedCreateInput } from "../../../inputs/BreedCreateInput";
import { BreedUpdateInput } from "../../../inputs/BreedUpdateInput";
import { BreedWhereUniqueInput } from "../../../inputs/BreedWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneBreedArgs {
  @TypeGraphQL.Field(_type => BreedWhereUniqueInput, {
    nullable: false
  })
  where!: BreedWhereUniqueInput;

  @TypeGraphQL.Field(_type => BreedCreateInput, {
    nullable: false
  })
  create!: BreedCreateInput;

  @TypeGraphQL.Field(_type => BreedUpdateInput, {
    nullable: false
  })
  update!: BreedUpdateInput;
}
