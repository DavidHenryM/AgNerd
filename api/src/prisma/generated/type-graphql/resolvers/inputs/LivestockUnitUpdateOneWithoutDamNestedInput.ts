import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutDamInput } from "../inputs/LivestockUnitCreateOrConnectWithoutDamInput";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitUpdateWithoutDamInput } from "../inputs/LivestockUnitUpdateWithoutDamInput";
import { LivestockUnitUpsertWithoutDamInput } from "../inputs/LivestockUnitUpsertWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneWithoutDamNestedInput", {
  isAbstract: true
})
export class LivestockUnitUpdateOneWithoutDamNestedInput {
  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutDamInput, {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutDamInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateOrConnectWithoutDamInput, {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutDamInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpsertWithoutDamInput, {
    nullable: true
  })
  upsert?: LivestockUnitUpsertWithoutDamInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: true
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateWithoutDamInput, {
    nullable: true
  })
  update?: LivestockUnitUpdateWithoutDamInput | undefined;
}
