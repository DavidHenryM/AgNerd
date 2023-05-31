import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedWhereInput } from "../../../inputs/BreedWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyBreedArgs {
  @TypeGraphQL.Field((_type) => BreedWhereInput, {
    nullable: true,
  })
  where?: BreedWhereInput | undefined;
}
