import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedCreateManyInput } from "../../../inputs/BreedCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyBreedArgs {
  @TypeGraphQL.Field(_type => [BreedCreateManyInput], {
    nullable: false
  })
  data!: BreedCreateManyInput[];
}
