import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitScalarWhereInput } from "../inputs/LivestockUnitScalarWhereInput";
import { LivestockUnitUpdateManyMutationInput } from "../inputs/LivestockUnitUpdateManyMutationInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateManyWithWhereWithoutPregnancyInput",
  {
    isAbstract: true,
  }
)
export class LivestockUnitUpdateManyWithWhereWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => LivestockUnitScalarWhereInput, {
    nullable: false,
  })
  where!: LivestockUnitScalarWhereInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateManyMutationInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateManyMutationInput;
}
