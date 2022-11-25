import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumSexFilter } from "../inputs/NestedEnumSexFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { Sex } from "../../enums/Sex";

@TypeGraphQL.InputType("NestedEnumSexWithAggregatesFilter", {
  isAbstract: true
})
export class NestedEnumSexWithAggregatesFilter {
  @TypeGraphQL.Field(_type => Sex, {
    nullable: true
  })
  equals?: "MALE" | "FEMALE" | undefined;

  @TypeGraphQL.Field(_type => [Sex], {
    nullable: true
  })
  in?: Array<"MALE" | "FEMALE"> | undefined;

  @TypeGraphQL.Field(_type => [Sex], {
    nullable: true
  })
  notIn?: Array<"MALE" | "FEMALE"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumSexWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumSexWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumSexFilter, {
    nullable: true
  })
  _min?: NestedEnumSexFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumSexFilter, {
    nullable: true
  })
  _max?: NestedEnumSexFilter | undefined;
}
