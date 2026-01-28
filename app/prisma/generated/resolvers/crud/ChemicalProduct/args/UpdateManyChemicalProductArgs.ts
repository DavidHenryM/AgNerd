import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductUpdateManyMutationInput } from "../../../inputs/ChemicalProductUpdateManyMutationInput";
import { ChemicalProductWhereInput } from "../../../inputs/ChemicalProductWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyChemicalProductArgs {
  @TypeGraphQL.Field((_type) => ChemicalProductUpdateManyMutationInput, {
    nullable: false,
  })
  data!: ChemicalProductUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  where?: ChemicalProductWhereInput | undefined;
}
