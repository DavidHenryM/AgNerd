import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductCreateInput } from "../../../inputs/ChemicalProductCreateInput";
import { ChemicalProductUpdateInput } from "../../../inputs/ChemicalProductUpdateInput";
import { ChemicalProductWhereUniqueInput } from "../../../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneChemicalProductArgs {
  @TypeGraphQL.Field(_type => ChemicalProductWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalProductWhereUniqueInput;

  @TypeGraphQL.Field(_type => ChemicalProductCreateInput, {
    nullable: false
  })
  create!: ChemicalProductCreateInput;

  @TypeGraphQL.Field(_type => ChemicalProductUpdateInput, {
    nullable: false
  })
  update!: ChemicalProductUpdateInput;
}
