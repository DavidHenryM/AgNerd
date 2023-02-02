import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope } from "../inputs/ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope";
import { ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput";
import { ChemicalTreatmentCreateWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateWithoutLiveStockUnitInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput", {
  isAbstract: true
})
export class ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput {
  @TypeGraphQL.Field(_type => [ChemicalTreatmentCreateWithoutLiveStockUnitInput], {
    nullable: true
  })
  create?: ChemicalTreatmentCreateWithoutLiveStockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => [ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput], {
    nullable: true
  })
  connectOrCreate?: ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput[] | undefined;

  @TypeGraphQL.Field(_type => ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope, {
    nullable: true
  })
  createMany?: ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [ChemicalTreatmentWhereUniqueInput], {
    nullable: true
  })
  connect?: ChemicalTreatmentWhereUniqueInput[] | undefined;
}
