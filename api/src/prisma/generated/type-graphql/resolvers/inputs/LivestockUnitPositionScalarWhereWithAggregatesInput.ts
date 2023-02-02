import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("LivestockUnitPositionScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class LivestockUnitPositionScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [LivestockUnitPositionScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: LivestockUnitPositionScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitPositionScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: LivestockUnitPositionScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitPositionScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: LivestockUnitPositionScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  date?: DateTimeWithAggregatesFilter | undefined;
}
