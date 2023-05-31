import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateNestedOneWithoutMembersInput } from "../inputs/BreedCreateNestedOneWithoutMembersInput";
import { ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput";
import { LivestockUnitCreateNestedOneWithoutDamInput } from "../inputs/LivestockUnitCreateNestedOneWithoutDamInput";
import { LivestockUnitCreateNestedOneWithoutSireInput } from "../inputs/LivestockUnitCreateNestedOneWithoutSireInput";
import { MobCreateNestedOneWithoutMembersInput } from "../inputs/MobCreateNestedOneWithoutMembersInput";
import { PregnancyCreateNestedManyWithoutParentsInput } from "../inputs/PregnancyCreateNestedManyWithoutParentsInput";
import { VisualIdCreateNestedOneWithoutLivestockUnitInput } from "../inputs/VisualIdCreateNestedOneWithoutLivestockUnitInput";
import { Sex } from "../../enums/Sex";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.InputType("LivestockUnitCreateWithoutWeightsInput", {
  isAbstract: true,
})
export class LivestockUnitCreateWithoutWeightsInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  nlisid?: string | undefined;

  @TypeGraphQL.Field((_type) => StockClass, {
    nullable: false,
  })
  class!:
    | "CATTLE"
    | "SHEEP"
    | "GOAT"
    | "CAMEL"
    | "ALPACA"
    | "LLAMA"
    | "CHICKEN"
    | "DUCK"
    | "TURKEY";

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  comment?: string | undefined;

  @TypeGraphQL.Field((_type) => Sex, {
    nullable: false,
  })
  sex!: "MALE" | "FEMALE";

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  birthdate!: Date;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
  desexed!: boolean;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  drySheepEquivalent?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  purchasePrice?: number | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  purchaseDate!: Date;

  @TypeGraphQL.Field(
    (_type) => VisualIdCreateNestedOneWithoutLivestockUnitInput,
    {
      nullable: true,
    }
  )
  visualid?: VisualIdCreateNestedOneWithoutLivestockUnitInput | undefined;

  @TypeGraphQL.Field((_type) => BreedCreateNestedOneWithoutMembersInput, {
    nullable: true,
  })
  breed?: BreedCreateNestedOneWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedOneWithoutDamInput, {
    nullable: true,
  })
  sire?: LivestockUnitCreateNestedOneWithoutDamInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedOneWithoutSireInput, {
    nullable: true,
  })
  dam?: LivestockUnitCreateNestedOneWithoutSireInput | undefined;

  @TypeGraphQL.Field((_type) => MobCreateNestedOneWithoutMembersInput, {
    nullable: false,
  })
  mob!: MobCreateNestedOneWithoutMembersInput;

  @TypeGraphQL.Field((_type) => PregnancyCreateNestedManyWithoutParentsInput, {
    nullable: true,
  })
  pregnancy?: PregnancyCreateNestedManyWithoutParentsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput,
    {
      nullable: true,
    }
  )
  treatments?:
    | ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput
    | undefined;
}
