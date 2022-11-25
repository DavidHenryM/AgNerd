import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateWithoutMembersInput } from "../inputs/BreedCreateWithoutMembersInput";
import { BreedUpdateWithoutMembersInput } from "../inputs/BreedUpdateWithoutMembersInput";

@TypeGraphQL.InputType("BreedUpsertWithoutMembersInput", {
  isAbstract: true
})
export class BreedUpsertWithoutMembersInput {
  @TypeGraphQL.Field(_type => BreedUpdateWithoutMembersInput, {
    nullable: false
  })
  update!: BreedUpdateWithoutMembersInput;

  @TypeGraphQL.Field(_type => BreedCreateWithoutMembersInput, {
    nullable: false
  })
  create!: BreedCreateWithoutMembersInput;
}
