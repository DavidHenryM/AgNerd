import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Breed } from "../models/Breed";
import { ChemicalTreatment } from "../models/ChemicalTreatment";
import { Mob } from "../models/Mob";
import { Pregnancy } from "../models/Pregnancy";
import { VisualId } from "../models/VisualId";
import { WeightRecord } from "../models/WeightRecord";
import { Sex } from "../enums/Sex";
import { StockClass } from "../enums/StockClass";
import { LivestockUnitCount } from "../resolvers/outputs/LivestockUnitCount";

@TypeGraphQL.ObjectType("LivestockUnit", {
  isAbstract: true
})
export class LivestockUnit {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  nlisid?: string | null;

  visualid?: VisualId | null;

  @TypeGraphQL.Field(_type => StockClass, {
    nullable: false
  })
  class!: "CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "LLAMA" | "CHICKEN" | "DUCK" | "TURKEY";

  breed?: Breed | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comment?: string | null;

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

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  parentId?: string | null;

  sire?: LivestockUnit | null;

  dam?: LivestockUnit | null;

  mob?: Mob;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  mobId!: string;

  pregnancy?: Pregnancy[];

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  pregnancyId!: string[];

  weights?: WeightRecord[];

  treatments?: ChemicalTreatment[];

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  drySheepEquivalent!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  purchasePrice!: number;

  @TypeGraphQL.Field(_type => LivestockUnitCount, {
    nullable: true
  })
  _count?: LivestockUnitCount | null;
}
