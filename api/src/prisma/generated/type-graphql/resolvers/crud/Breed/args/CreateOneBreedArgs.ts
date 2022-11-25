import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedCreateInput } from "../../../inputs/BreedCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneBreedArgs {
  @TypeGraphQL.Field(_type => BreedCreateInput, {
    nullable: false
  })
  data!: BreedCreateInput;
}
