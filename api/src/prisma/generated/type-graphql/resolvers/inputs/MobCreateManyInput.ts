import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreategrazeIdsInput } from "../inputs/MobCreategrazeIdsInput";

@TypeGraphQL.InputType("MobCreateManyInput", {
  isAbstract: true,
})
export class MobCreateManyInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  comment?: string | undefined;

  @TypeGraphQL.Field((_type) => MobCreategrazeIdsInput, {
    nullable: true,
  })
  grazeIds?: MobCreategrazeIdsInput | undefined;
}
