import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreatepregnancyIdInput } from "../inputs/LivestockUnitCreatepregnancyIdInput";
import { Sex } from "../../enums/Sex";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.InputType("LivestockUnitCreateManyMobInput", {
  isAbstract: true,
})
export class LivestockUnitCreateManyMobInput {
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

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  parentId?: string | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreatepregnancyIdInput, {
    nullable: true,
  })
  pregnancyId?: LivestockUnitCreatepregnancyIdInput | undefined;

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
}
