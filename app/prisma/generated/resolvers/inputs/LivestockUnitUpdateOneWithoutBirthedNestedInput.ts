import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutBirthedInput } from "../inputs/LivestockUnitCreateOrConnectWithoutBirthedInput";
import { LivestockUnitCreateWithoutBirthedInput } from "../inputs/LivestockUnitCreateWithoutBirthedInput";
import { LivestockUnitUpdateToOneWithWhereWithoutBirthedInput } from "../inputs/LivestockUnitUpdateToOneWithWhereWithoutBirthedInput";
import { LivestockUnitUpsertWithoutBirthedInput } from "../inputs/LivestockUnitUpsertWithoutBirthedInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneWithoutBirthedNestedInput", {})
export class LivestockUnitUpdateOneWithoutBirthedNestedInput {
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

  @TypeGraphQL.Field((_type) => LivestockUnitUpsertWithoutBirthedInput, {
    nullable: true,
  })
  upsert?: LivestockUnitUpsertWithoutBirthedInput | undefined;

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
    (_type) => LivestockUnitUpdateToOneWithWhereWithoutBirthedInput,
    {
      nullable: true,
    },
  )
  update?: LivestockUnitUpdateToOneWithWhereWithoutBirthedInput | undefined;
}
