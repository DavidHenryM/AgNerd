import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCreateNestedOneWithoutMembersInput } from "../inputs/BreedCreateNestedOneWithoutMembersInput";
import { ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput";
import { EstimatedBreedingValueResultCreateNestedManyWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateNestedManyWithoutLivestockUnitInput";
import { LivestockUnitCreateNestedManyWithoutDamInput } from "../inputs/LivestockUnitCreateNestedManyWithoutDamInput";
import { LivestockUnitCreateNestedManyWithoutSireInput } from "../inputs/LivestockUnitCreateNestedManyWithoutSireInput";
import { LivestockUnitCreateNestedOneWithoutBirthedInput } from "../inputs/LivestockUnitCreateNestedOneWithoutBirthedInput";
import { LivestockUnitCreateNestedOneWithoutSiredInput } from "../inputs/LivestockUnitCreateNestedOneWithoutSiredInput";
import { MobCreateNestedOneWithoutMembersInput } from "../inputs/MobCreateNestedOneWithoutMembersInput";
import { PregnancyCreateNestedManyWithoutParentsInput } from "../inputs/PregnancyCreateNestedManyWithoutParentsInput";
import { CommercialClass } from "../../enums/CommercialClass";
import { Sex } from "../../enums/Sex";
import { StockClass } from "../../enums/StockClass";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.InputType("LivestockUnitCreateWithoutWeightsInput", {})
export class LivestockUnitCreateWithoutWeightsInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  nlisId?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine1?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine2?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  visualIdLine3?: string | undefined;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  visualIdBackgroundColour?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | undefined;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  visualIdTextColour?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | undefined;

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

  @TypeGraphQL.Field((_type) => CommercialClass, {
    nullable: true,
  })
  commercialClass?: "COMMERCIAL" | "SEEDSTOCK" | "PET" | undefined;

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
  birthDate!: Date;

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
    nullable: true,
  })
  purchaseDate?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  angusTechId?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  active?: boolean | undefined;

  @TypeGraphQL.Field((_type) => BreedCreateNestedOneWithoutMembersInput, {
    nullable: true,
  })
  breed?: BreedCreateNestedOneWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedOneWithoutSiredInput, {
    nullable: true,
  })
  sire?: LivestockUnitCreateNestedOneWithoutSiredInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedManyWithoutSireInput, {
    nullable: true,
  })
  sired?: LivestockUnitCreateNestedManyWithoutSireInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateNestedOneWithoutBirthedInput,
    {
      nullable: true,
    },
  )
  dam?: LivestockUnitCreateNestedOneWithoutBirthedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedManyWithoutDamInput, {
    nullable: true,
  })
  birthed?: LivestockUnitCreateNestedManyWithoutDamInput | undefined;

  @TypeGraphQL.Field((_type) => MobCreateNestedOneWithoutMembersInput, {
    nullable: true,
  })
  mob?: MobCreateNestedOneWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyCreateNestedManyWithoutParentsInput, {
    nullable: true,
  })
  pregnancy?: PregnancyCreateNestedManyWithoutParentsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput,
    {
      nullable: true,
    },
  )
  treatments?:
    | ChemicalTreatmentCreateNestedManyWithoutLiveStockUnitInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      EstimatedBreedingValueResultCreateNestedManyWithoutLivestockUnitInput,
    {
      nullable: true,
    },
  )
  estimatedBreedingValueResult?:
    | EstimatedBreedingValueResultCreateNestedManyWithoutLivestockUnitInput
    | undefined;
}
