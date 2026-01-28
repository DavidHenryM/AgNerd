import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateWithoutMembersInput } from "../inputs/BreedCreateWithoutMembersInput";
import { BreedUpdateWithoutMembersInput } from "../inputs/BreedUpdateWithoutMembersInput";
import { BreedWhereInput } from "../inputs/BreedWhereInput";

@TypeGraphQL.InputType("BreedUpsertWithoutMembersInput", {})
export class BreedUpsertWithoutMembersInput {
  @TypeGraphQL.Field((_type) => BreedUpdateWithoutMembersInput, {
    nullable: false,
  })
  update!: BreedUpdateWithoutMembersInput;

  @TypeGraphQL.Field((_type) => BreedCreateWithoutMembersInput, {
    nullable: false,
  })
  create!: BreedCreateWithoutMembersInput;

  @TypeGraphQL.Field((_type) => BreedWhereInput, {
    nullable: true,
  })
  where?: BreedWhereInput | undefined;
}
