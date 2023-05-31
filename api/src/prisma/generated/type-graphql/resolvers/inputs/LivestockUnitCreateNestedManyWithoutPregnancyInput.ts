import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutPregnancyInput } from "../inputs/LivestockUnitCreateOrConnectWithoutPregnancyInput";
import { LivestockUnitCreateWithoutPregnancyInput } from "../inputs/LivestockUnitCreateWithoutPregnancyInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedManyWithoutPregnancyInput", {
  isAbstract: true,
})
export class LivestockUnitCreateNestedManyWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateWithoutPregnancyInput], {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutPregnancyInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitCreateOrConnectWithoutPregnancyInput],
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | LivestockUnitCreateOrConnectWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput[] | undefined;
}
