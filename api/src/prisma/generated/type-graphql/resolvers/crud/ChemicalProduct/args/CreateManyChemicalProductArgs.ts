import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductCreateManyInput } from "../../../inputs/ChemicalProductCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyChemicalProductArgs {
  @TypeGraphQL.Field(_type => [ChemicalProductCreateManyInput], {
    nullable: false
  })
  data!: ChemicalProductCreateManyInput[];
}
