import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateNestedOneWithoutMembersInput } from "../inputs/BreedCreateNestedOneWithoutMembersInput";
import { LivestockUnitCreateNestedOneWithoutDamInput } from "../inputs/LivestockUnitCreateNestedOneWithoutDamInput";
import { LivestockUnitCreateNestedOneWithoutSireInput } from "../inputs/LivestockUnitCreateNestedOneWithoutSireInput";
import { MobCreateNestedOneWithoutMembersInput } from "../inputs/MobCreateNestedOneWithoutMembersInput";
import { WeightRecordCreateNestedManyWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateNestedManyWithoutLivestockUnitInput";
import { Sex } from "../../enums/Sex";

@TypeGraphQL.InputType("LivestockUnitCreateInput", {
  isAbstract: true
})
export class LivestockUnitCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  nlisid?: string | undefined;

  @TypeGraphQL.Field(_type => BreedCreateNestedOneWithoutMembersInput, {
    nullable: true
  })
  breed?: BreedCreateNestedOneWithoutMembersInput | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comment?: string | undefined;

  @TypeGraphQL.Field(_type => Sex, {
    nullable: false
  })
  sex!: "MALE" | "FEMALE";

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  birthdate!: Date;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  desexed!: boolean;

  @TypeGraphQL.Field(_type => LivestockUnitCreateNestedOneWithoutDamInput, {
    nullable: true
  })
  sire?: LivestockUnitCreateNestedOneWithoutDamInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitCreateNestedOneWithoutSireInput, {
    nullable: true
  })
  dam?: LivestockUnitCreateNestedOneWithoutSireInput | undefined;

  @TypeGraphQL.Field(_type => MobCreateNestedOneWithoutMembersInput, {
    nullable: false
  })
  mob!: MobCreateNestedOneWithoutMembersInput;

  @TypeGraphQL.Field(_type => WeightRecordCreateNestedManyWithoutLivestockUnitInput, {
    nullable: true
  })
  weights?: WeightRecordCreateNestedManyWithoutLivestockUnitInput | undefined;
}
