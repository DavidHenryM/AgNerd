import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("ChemicalProductCreateWithoutTreatmentInput", {
  isAbstract: true
})
export class ChemicalProductCreateWithoutTreatmentInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  manufacturer!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  product_name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  serial_number!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  volume_ml!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  cost?: number | undefined;
}
