import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateOrConnectWithoutGrazeInput } from "../inputs/MobCreateOrConnectWithoutGrazeInput";
import { MobCreateWithoutGrazeInput } from "../inputs/MobCreateWithoutGrazeInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobCreateNestedManyWithoutGrazeInput", {
  isAbstract: true
})
export class MobCreateNestedManyWithoutGrazeInput {
  @TypeGraphQL.Field(_type => [MobCreateWithoutGrazeInput], {
    nullable: true
  })
  create?: MobCreateWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field(_type => [MobCreateOrConnectWithoutGrazeInput], {
    nullable: true
  })
  connectOrCreate?: MobCreateOrConnectWithoutGrazeInput[] | undefined;

  @TypeGraphQL.Field(_type => [MobWhereUniqueInput], {
    nullable: true
  })
  connect?: MobWhereUniqueInput[] | undefined;
}
