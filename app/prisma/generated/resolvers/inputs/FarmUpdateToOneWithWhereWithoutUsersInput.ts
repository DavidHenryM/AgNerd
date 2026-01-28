import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmUpdateWithoutUsersInput } from "../inputs/FarmUpdateWithoutUsersInput";
import { FarmWhereInput } from "../inputs/FarmWhereInput";

@TypeGraphQL.InputType("FarmUpdateToOneWithWhereWithoutUsersInput", {})
export class FarmUpdateToOneWithWhereWithoutUsersInput {
  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  where?: FarmWhereInput | undefined;

  @TypeGraphQL.Field((_type) => FarmUpdateWithoutUsersInput, {
    nullable: false,
  })
  data!: FarmUpdateWithoutUsersInput;
}
