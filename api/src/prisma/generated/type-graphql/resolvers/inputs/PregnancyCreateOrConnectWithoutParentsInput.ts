import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateWithoutParentsInput } from "../inputs/PregnancyCreateWithoutParentsInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyCreateOrConnectWithoutParentsInput", {
  isAbstract: true
})
export class PregnancyCreateOrConnectWithoutParentsInput {
  @TypeGraphQL.Field(_type => PregnancyWhereUniqueInput, {
    nullable: false
  })
  where!: PregnancyWhereUniqueInput;

  @TypeGraphQL.Field(_type => PregnancyCreateWithoutParentsInput, {
    nullable: false
  })
  create!: PregnancyCreateWithoutParentsInput;
}
