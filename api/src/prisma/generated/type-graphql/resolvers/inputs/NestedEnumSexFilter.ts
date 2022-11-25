import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Sex } from "../../enums/Sex";

@TypeGraphQL.InputType("NestedEnumSexFilter", {
  isAbstract: true
})
export class NestedEnumSexFilter {
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

  @TypeGraphQL.Field(_type => NestedEnumSexFilter, {
    nullable: true
  })
  not?: NestedEnumSexFilter | undefined;
}
