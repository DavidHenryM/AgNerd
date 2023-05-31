import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateWithoutParentsInput } from "../inputs/PregnancyCreateWithoutParentsInput";
import { PregnancyUpdateWithoutParentsInput } from "../inputs/PregnancyUpdateWithoutParentsInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyUpsertWithWhereUniqueWithoutParentsInput", {
  isAbstract: true,
})
export class PregnancyUpsertWithWhereUniqueWithoutParentsInput {
  @TypeGraphQL.Field((_type) => PregnancyWhereUniqueInput, {
    nullable: false,
  })
  where!: PregnancyWhereUniqueInput;

  @TypeGraphQL.Field((_type) => PregnancyUpdateWithoutParentsInput, {
    nullable: false,
  })
  update!: PregnancyUpdateWithoutParentsInput;

  @TypeGraphQL.Field((_type) => PregnancyCreateWithoutParentsInput, {
    nullable: false,
  })
  create!: PregnancyCreateWithoutParentsInput;
}
