import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitOrderByWithRelationInput } from "../inputs/LivestockUnitOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("BreedOrderByWithRelationInput", {
  isAbstract: true
})
export class BreedOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  class?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitOrderByWithRelationInput, {
    nullable: true
  })
  members?: LivestockUnitOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  memberId?: "asc" | "desc" | undefined;
}
