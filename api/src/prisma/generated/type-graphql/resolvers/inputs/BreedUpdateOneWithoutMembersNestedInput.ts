import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateOrConnectWithoutMembersInput } from "../inputs/BreedCreateOrConnectWithoutMembersInput";
import { BreedCreateWithoutMembersInput } from "../inputs/BreedCreateWithoutMembersInput";
import { BreedUpdateWithoutMembersInput } from "../inputs/BreedUpdateWithoutMembersInput";
import { BreedUpsertWithoutMembersInput } from "../inputs/BreedUpsertWithoutMembersInput";
import { BreedWhereUniqueInput } from "../inputs/BreedWhereUniqueInput";

@TypeGraphQL.InputType("BreedUpdateOneWithoutMembersNestedInput", {
  isAbstract: true,
})
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

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => BreedWhereUniqueInput, {
    nullable: true,
  })
  connect?: BreedWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => BreedUpdateWithoutMembersInput, {
    nullable: true,
  })
  update?: BreedUpdateWithoutMembersInput | undefined;
}
