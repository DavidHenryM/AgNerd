import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestCreateNestedManyWithoutPregnancyInput } from "../inputs/PregnancyTestCreateNestedManyWithoutPregnancyInput";

@TypeGraphQL.InputType("PregnancyCreateWithoutParentsInput", {
  isAbstract: true,
})
export class PregnancyCreateWithoutParentsInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  earliestPossibleConception?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  latestPossibleConception?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  conception?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  dueDate?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  earliestPossibleBirth?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  latestPossibleBirth?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  pregnancySireId!: string;

  @TypeGraphQL.Field(
    (_type) => PregnancyTestCreateNestedManyWithoutPregnancyInput,
    {
      nullable: true,
    }
  )
  pregnancyTest?:
    | PregnancyTestCreateNestedManyWithoutPregnancyInput
    | undefined;
}
