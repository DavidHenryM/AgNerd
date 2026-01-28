import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCreatelotSectionPlanInput } from "../inputs/FarmCreatelotSectionPlanInput";

@TypeGraphQL.InputType("FarmCreateWithoutUsersInput", {})
export class FarmCreateWithoutUsersInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  businessName?: string | undefined;

  @TypeGraphQL.Field((_type) => FarmCreatelotSectionPlanInput, {
    nullable: true,
  })
  lotSectionPlan?: FarmCreatelotSectionPlanInput | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  abn?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  acn?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  pic?: string | undefined;
}
