import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateWithoutMembersInput } from "../inputs/BreedCreateWithoutMembersInput";
import { BreedWhereUniqueInput } from "../inputs/BreedWhereUniqueInput";

@TypeGraphQL.InputType("BreedCreateOrConnectWithoutMembersInput", {
  isAbstract: true
})
export class BreedCreateOrConnectWithoutMembersInput {
  @TypeGraphQL.Field(_type => BreedWhereUniqueInput, {
    nullable: false
  })
  where!: BreedWhereUniqueInput;

  @TypeGraphQL.Field(_type => BreedCreateWithoutMembersInput, {
    nullable: false
  })
  create!: BreedCreateWithoutMembersInput;
}
