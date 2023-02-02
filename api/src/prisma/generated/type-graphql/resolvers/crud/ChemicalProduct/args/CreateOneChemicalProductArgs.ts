import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductCreateInput } from "../../../inputs/ChemicalProductCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneChemicalProductArgs {
  @TypeGraphQL.Field(_type => ChemicalProductCreateInput, {
    nullable: false
  })
  data!: ChemicalProductCreateInput;
}
