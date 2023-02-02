import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductWhereUniqueInput } from "../../../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneChemicalProductArgs {
  @TypeGraphQL.Field(_type => ChemicalProductWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalProductWhereUniqueInput;
}
