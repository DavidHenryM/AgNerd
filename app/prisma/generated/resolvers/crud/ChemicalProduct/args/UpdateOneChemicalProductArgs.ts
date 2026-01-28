import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductUpdateInput } from "../../../inputs/ChemicalProductUpdateInput";
import { ChemicalProductWhereUniqueInput } from "../../../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneChemicalProductArgs {
  @TypeGraphQL.Field((_type) => ChemicalProductUpdateInput, {
    nullable: false,
  })
  data!: ChemicalProductUpdateInput;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalProductWhereUniqueInput;
}
