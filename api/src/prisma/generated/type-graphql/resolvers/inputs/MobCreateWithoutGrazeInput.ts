import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedManyWithoutMobInput } from "../inputs/LivestockUnitCreateNestedManyWithoutMobInput";
import { MobCreategrazeIdsInput } from "../inputs/MobCreategrazeIdsInput";

@TypeGraphQL.InputType("MobCreateWithoutGrazeInput", {
  isAbstract: true
})
export class MobCreateWithoutGrazeInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateNestedManyWithoutMobInput, {
    nullable: true
  })
  members?: LivestockUnitCreateNestedManyWithoutMobInput | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  comment!: string;

  @TypeGraphQL.Field(_type => MobCreategrazeIdsInput, {
    nullable: true
  })
  grazeIds?: MobCreategrazeIdsInput | undefined;
}
