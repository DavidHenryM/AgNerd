import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentOrderByWithRelationInput } from "../../../inputs/ChemicalTreatmentOrderByWithRelationInput";
import { ChemicalTreatmentWhereInput } from "../../../inputs/ChemicalTreatmentWhereInput";
import { ChemicalTreatmentWhereUniqueInput } from "../../../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateChemicalTreatmentArgs {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereInput, {
    nullable: true,
  })
  where?: ChemicalTreatmentWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: ChemicalTreatmentOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: true,
  })
  cursor?: ChemicalTreatmentWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}
