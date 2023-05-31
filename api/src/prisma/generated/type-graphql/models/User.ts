import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("User", {
  isAbstract: true,
})
export class User {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  firstName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  preferredName?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  lastName!: string;
}
