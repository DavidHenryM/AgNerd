import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentWhereInput } from "../../inputs/ChemicalTreatmentWhereInput";

@TypeGraphQL.ArgsType()
export class LivestockUnitCountTreatmentsArgs {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereInput, {
    nullable: true,
  })
  where?: ChemicalTreatmentWhereInput | undefined;
}
