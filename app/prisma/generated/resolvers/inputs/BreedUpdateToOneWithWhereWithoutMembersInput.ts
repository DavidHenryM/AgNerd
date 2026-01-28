import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedUpdateWithoutMembersInput } from "../inputs/BreedUpdateWithoutMembersInput";
import { BreedWhereInput } from "../inputs/BreedWhereInput";

@TypeGraphQL.InputType("BreedUpdateToOneWithWhereWithoutMembersInput", {})
export class BreedUpdateToOneWithWhereWithoutMembersInput {
  @TypeGraphQL.Field((_type) => BreedWhereInput, {
    nullable: true,
  })
  where?: BreedWhereInput | undefined;

  @TypeGraphQL.Field((_type) => BreedUpdateWithoutMembersInput, {
    nullable: false,
  })
  data!: BreedUpdateWithoutMembersInput;
}
