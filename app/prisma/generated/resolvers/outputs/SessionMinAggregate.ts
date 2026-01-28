import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("SessionMinAggregate", {})
export class SessionMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  expiresAt!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  token!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  ipAddress!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  userAgent!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  userId!: string | null;
}
