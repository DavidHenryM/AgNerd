import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutSireInput } from "../inputs/LivestockUnitCreateOrConnectWithoutSireInput";
import { LivestockUnitCreateWithoutSireInput } from "../inputs/LivestockUnitCreateWithoutSireInput";
import { LivestockUnitUpdateWithoutSireInput } from "../inputs/LivestockUnitUpdateWithoutSireInput";
import { LivestockUnitUpsertWithoutSireInput } from "../inputs/LivestockUnitUpsertWithoutSireInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateOneWithoutSireNestedInput", {
  isAbstract: true
})
export class LivestockUnitUpdateOneWithoutSireNestedInput {
  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutSireInput, {
    nullable: true
  })
  create?: LivestockUnitCreateWithoutSireInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateOrConnectWithoutSireInput, {
    nullable: true
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutSireInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpsertWithoutSireInput, {
    nullable: true
  })
  upsert?: LivestockUnitUpsertWithoutSireInput | undefined;

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

  @TypeGraphQL.Field(_type => LivestockUnitUpdateWithoutSireInput, {
    nullable: true
  })
  update?: LivestockUnitUpdateWithoutSireInput | undefined;
}
