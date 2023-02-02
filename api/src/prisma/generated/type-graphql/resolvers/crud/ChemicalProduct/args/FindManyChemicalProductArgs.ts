import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductOrderByWithRelationInput } from "../../../inputs/ChemicalProductOrderByWithRelationInput";
import { ChemicalProductWhereInput } from "../../../inputs/ChemicalProductWhereInput";
import { ChemicalProductWhereUniqueInput } from "../../../inputs/ChemicalProductWhereUniqueInput";
import { ChemicalProductScalarFieldEnum } from "../../../../enums/ChemicalProductScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyChemicalProductArgs {
  @TypeGraphQL.Field(_type => ChemicalProductWhereInput, {
    nullable: true
  })
  where?: ChemicalProductWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ChemicalProductOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ChemicalProductOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ChemicalProductWhereUniqueInput, {
    nullable: true
  })
  cursor?: ChemicalProductWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ChemicalProductScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "chemicalTreatmentId" | "manufacturer" | "product_name" | "serial_number" | "volume_ml" | "cost"> | undefined;
}
