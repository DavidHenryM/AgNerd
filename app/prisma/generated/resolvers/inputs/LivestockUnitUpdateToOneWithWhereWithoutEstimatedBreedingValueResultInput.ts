import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateToOneWithWhereWithoutEstimatedBreedingValueResultInput",
  {},
)
export class LivestockUnitUpdateToOneWithWhereWithoutEstimatedBreedingValueResultInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput,
    {
      nullable: false,
    },
  )
  data!: LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput;
}
