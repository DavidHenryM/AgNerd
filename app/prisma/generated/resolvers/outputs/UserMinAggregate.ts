import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("UserMinAggregate", {})
export class UserMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email!: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  emailVerified!: boolean | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  image!: string | null;

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
  firstName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  preferredName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  lastName!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  farmId!: string | null;
}
