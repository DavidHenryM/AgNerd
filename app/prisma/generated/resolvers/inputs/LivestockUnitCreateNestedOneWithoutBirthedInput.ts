import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutBirthedInput } from "../inputs/LivestockUnitCreateOrConnectWithoutBirthedInput";
import { LivestockUnitCreateWithoutBirthedInput } from "../inputs/LivestockUnitCreateWithoutBirthedInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateNestedOneWithoutBirthedInput", {})
export class LivestockUnitCreateNestedOneWithoutBirthedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutBirthedInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutBirthedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateOrConnectWithoutBirthedInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutBirthedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}
