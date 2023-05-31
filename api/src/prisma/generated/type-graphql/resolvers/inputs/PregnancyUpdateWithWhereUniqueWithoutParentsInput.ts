import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyUpdateWithoutParentsInput } from "../inputs/PregnancyUpdateWithoutParentsInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyUpdateWithWhereUniqueWithoutParentsInput", {
  isAbstract: true,
})
export class PregnancyUpdateWithWhereUniqueWithoutParentsInput {
  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: false,
  })
  where!: PregnancyWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PregnancyUpdateWithoutParentsInput, {
    nullable: false,
  })
  data!: PregnancyUpdateWithoutParentsInput;
}
