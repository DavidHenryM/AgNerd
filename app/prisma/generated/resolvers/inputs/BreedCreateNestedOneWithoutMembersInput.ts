import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateOrConnectWithoutMembersInput } from "../inputs/BreedCreateOrConnectWithoutMembersInput";
import { BreedCreateWithoutMembersInput } from "../inputs/BreedCreateWithoutMembersInput";
import { BreedWhereUniqueInput } from "../inputs/BreedWhereUniqueInput";

@TypeGraphQL.InputType("BreedCreateNestedOneWithoutMembersInput", {})
export class BreedCreateNestedOneWithoutMembersInput {
  @TypeGraphQL.Field((_type) => BreedCreateWithoutMembersInput, {
    nullable: true,
  })
  create?: BreedCreateWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => BreedCreateOrConnectWithoutMembersInput, {
    nullable: true,
  })
  connectOrCreate?: BreedCreateOrConnectWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => BreedWhereUniqueInput, {
    nullable: true,
  })
  connect?: BreedWhereUniqueInput | undefined;
}
