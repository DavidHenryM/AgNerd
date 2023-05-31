import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCreateOrConnectWithoutParentsInput } from "../inputs/PregnancyCreateOrConnectWithoutParentsInput";
import { PregnancyCreateWithoutParentsInput } from "../inputs/PregnancyCreateWithoutParentsInput";
import { PregnancyWhereUniqueInput } from "../inputs/PregnancyWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyCreateNestedManyWithoutParentsInput", {
  isAbstract: true,
})
export class PregnancyCreateNestedManyWithoutParentsInput {
  @TypeGraphQL.Field((_type) => [PregnancyCreateWithoutParentsInput], {
    nullable: true,
  })
  create?: PregnancyCreateWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyCreateOrConnectWithoutParentsInput], {
    nullable: true,
  })
  connectOrCreate?: PregnancyCreateOrConnectWithoutParentsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereUniqueInput], {
    nullable: true,
  })
  connect?: PregnancyWhereUniqueInput[] | undefined;
}
