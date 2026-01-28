import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutBreedInput } from "../inputs/LivestockUnitUpdateWithoutBreedInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitUpdateToOneWithWhereWithoutBreedInput", {})
export class LivestockUnitUpdateToOneWithWhereWithoutBreedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutBreedInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutBreedInput;
}
