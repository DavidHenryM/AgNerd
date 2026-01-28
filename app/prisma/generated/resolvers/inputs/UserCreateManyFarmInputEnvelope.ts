import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateManyFarmInput } from "../inputs/UserCreateManyFarmInput";

@TypeGraphQL.InputType("UserCreateManyFarmInputEnvelope", {})
export class UserCreateManyFarmInputEnvelope {
  @TypeGraphQL.Field((_type) => [UserCreateManyFarmInput], {
    nullable: false,
  })
  data!: UserCreateManyFarmInput[];
}
