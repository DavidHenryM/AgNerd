import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutSiredInput } from "../inputs/LivestockUnitCreateOrConnectWithoutSiredInput";
import { LivestockUnitCreateWithoutSiredInput } from "../inputs/LivestockUnitCreateWithoutSiredInput";
import { LivestockUnitUpdateToOneWithWhereWithoutSiredInput } from "../inputs/LivestockUnitUpdateToOneWithWhereWithoutSiredInput";
import { LivestockUnitUpsertWithoutSiredInput } from "../inputs/LivestockUnitUpsertWithoutSiredInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneWithoutSiredNestedInput", {})
export class LivestockUnitUpdateOneWithoutSiredNestedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutSiredInput, {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutSiredInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateOrConnectWithoutSiredInput, {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutSiredInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpsertWithoutSiredInput, {
    nullable: true,
  })
  upsert?: LivestockUnitUpsertWithoutSiredInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  delete?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateToOneWithWhereWithoutSiredInput,
    {
      nullable: true,
    },
  )
  update?: LivestockUnitUpdateToOneWithWhereWithoutSiredInput | undefined;
}
