import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedWhereUniqueInput } from "../../../inputs/BreedWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueBreedArgs {
  @TypeGraphQL.Field((_type) => BreedWhereUniqueInput, {
    nullable: false,
  })
  where!: BreedWhereUniqueInput;
}
