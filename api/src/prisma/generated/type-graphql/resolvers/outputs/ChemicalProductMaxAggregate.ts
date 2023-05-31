import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("ChemicalProductMaxAggregate", {
  isAbstract: true,
})
export class ChemicalProductMaxAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  chemicalTreatmentId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  manufacturer!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  product_name!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  serial_number!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  volume_ml!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost!: number | null;
}
