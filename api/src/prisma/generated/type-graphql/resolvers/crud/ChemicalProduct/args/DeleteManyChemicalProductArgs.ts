import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductWhereInput } from "../../../inputs/ChemicalProductWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyChemicalProductArgs {
  @TypeGraphQL.Field(_type => ChemicalProductWhereInput, {
    nullable: true
  })
  where?: ChemicalProductWhereInput | undefined;
}
