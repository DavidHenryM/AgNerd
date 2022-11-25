import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeUpdateWithoutPaddockInput } from "../inputs/GrazeUpdateWithoutPaddockInput";
import { GrazeWhereUniqueInput } from "../inputs/GrazeWhereUniqueInput";

@TypeGraphQL.InputType("GrazeUpdateWithWhereUniqueWithoutPaddockInput", {
  isAbstract: true
})
export class GrazeUpdateWithWhereUniqueWithoutPaddockInput {
  @TypeGraphQL.Field(_type => GrazeWhereUniqueInput, {
    nullable: false
  })
  where!: GrazeWhereUniqueInput;

  @TypeGraphQL.Field(_type => GrazeUpdateWithoutPaddockInput, {
    nullable: false
  })
  data!: GrazeUpdateWithoutPaddockInput;
}
