import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.InputType("ChemicalTreatmentCreateManyProductInput", {})
export class ChemicalTreatmentCreateManyProductInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitId!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  treatmentDate!: Date;

  @TypeGraphQL.Field((_type) => ApplicationMethod, {
    nullable: false,
  })
  applicationMethod!:
    | "ORAL"
    | "TRANSDERMAL"
    | "SUB_CUT_INJECTION"
    | "INTRAVENUS_INJECTION";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  volumeMl!: number;
}
