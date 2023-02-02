import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumApplicationMethodFilter } from "../inputs/NestedEnumApplicationMethodFilter";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.InputType("EnumApplicationMethodFilter", {
  isAbstract: true
})
export class EnumApplicationMethodFilter {
  @TypeGraphQL.Field(_type => ApplicationMethod, {
    nullable: true
  })
  equals?: "ORAL" | "TRANSDERMAL" | "SUB_CUT_INJECTION" | "INTRAVENUS_INJECTION" | undefined;

  @TypeGraphQL.Field(_type => [ApplicationMethod], {
    nullable: true
  })
  in?: Array<"ORAL" | "TRANSDERMAL" | "SUB_CUT_INJECTION" | "INTRAVENUS_INJECTION"> | undefined;

  @TypeGraphQL.Field(_type => [ApplicationMethod], {
    nullable: true
  })
  notIn?: Array<"ORAL" | "TRANSDERMAL" | "SUB_CUT_INJECTION" | "INTRAVENUS_INJECTION"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumApplicationMethodFilter, {
    nullable: true
  })
  not?: NestedEnumApplicationMethodFilter | undefined;
}
