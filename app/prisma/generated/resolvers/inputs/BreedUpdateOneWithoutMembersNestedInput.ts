import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateOrConnectWithoutMembersInput } from "../inputs/BreedCreateOrConnectWithoutMembersInput";
import { BreedCreateWithoutMembersInput } from "../inputs/BreedCreateWithoutMembersInput";
import { BreedUpdateToOneWithWhereWithoutMembersInput } from "../inputs/BreedUpdateToOneWithWhereWithoutMembersInput";
import { BreedUpsertWithoutMembersInput } from "../inputs/BreedUpsertWithoutMembersInput";
import { BreedWhereInput } from "../inputs/BreedWhereInput";
import { BreedWhereUniqueInput } from "../inputs/BreedWhereUniqueInput";

@TypeGraphQL.InputType("BreedUpdateOneWithoutMembersNestedInput", {})
export class BreedUpdateOneWithoutMembersNestedInput {
  @TypeGraphQL.Field((_type) => BreedCreateWithoutMembersInput, {
    nullable: true,
  })
  create?: BreedCreateWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => BreedCreateOrConnectWithoutMembersInput, {
    nullable: true,
  })
  connectOrCreate?: BreedCreateOrConnectWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => BreedUpsertWithoutMembersInput, {
    nullable: true,
  })
  upsert?: BreedUpsertWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => BreedWhereInput, {
    nullable: true,
  })
  disconnect?: BreedWhereInput | undefined;

  @TypeGraphQL.Field((_type) => BreedWhereInput, {
    nullable: true,
  })
  delete?: BreedWhereInput | undefined;

  @TypeGraphQL.Field((_type) => BreedWhereUniqueInput, {
    nullable: true,
  })
  connect?: BreedWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => BreedUpdateToOneWithWhereWithoutMembersInput, {
    nullable: true,
  })
  update?: BreedUpdateToOneWithWhereWithoutMembersInput | undefined;
}
