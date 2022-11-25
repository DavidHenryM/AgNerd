import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutBreedInput } from "../inputs/LivestockUnitCreateOrConnectWithoutBreedInput";
import { LivestockUnitCreateWithoutBreedInput } from "../inputs/LivestockUnitCreateWithoutBreedInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutBreedInput", {
  isAbstract: true
})
export class LivestockUnitCreateNestedOneWithoutBreedInput {
  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutBreedInput, {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutBreedInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateOrConnectWithoutBreedInput, {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutBreedInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: true
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
