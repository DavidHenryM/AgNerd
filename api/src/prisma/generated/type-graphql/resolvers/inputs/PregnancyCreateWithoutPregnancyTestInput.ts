import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedManyWithoutPregnancyInput } from "../inputs/LivestockUnitCreateNestedManyWithoutPregnancyInput";
import { PregnancyCreateparentIdInput } from "../inputs/PregnancyCreateparentIdInput";

@TypeGraphQL.InputType("PregnancyCreateWithoutPregnancyTestInput", {
  isAbstract: true
})
export class PregnancyCreateWithoutPregnancyTestInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  earliestPossibleConception?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  latestPossibleConception?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  conception?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dueDate?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  earliestPossibleBirth?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  latestPossibleBirth?: Date | undefined;

  @TypeGraphQL.Field(_type => PregnancyCreateparentIdInput, {
    nullable: true
  })
  parentId?: PregnancyCreateparentIdInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateNestedManyWithoutPregnancyInput, {
    nullable: true
  })
  parents?: LivestockUnitCreateNestedManyWithoutPregnancyInput | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  pregnancySireId!: string;
}
