import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumCommercialClassNullableFilter } from "../inputs/NestedEnumCommercialClassNullableFilter";
import { CommercialClass } from "../../enums/CommercialClass";

@TypeGraphQL.InputType("EnumCommercialClassNullableFilter", {})
export class EnumCommercialClassNullableFilter {
  @TypeGraphQL.Field((_type) => CommercialClass, {
    nullable: true,
  })
  equals?: "COMMERCIAL" | "SEEDSTOCK" | "PET" | undefined;

  @TypeGraphQL.Field((_type) => [CommercialClass], {
    nullable: true,
  })
  in?: Array<"COMMERCIAL" | "SEEDSTOCK" | "PET"> | undefined;

  @TypeGraphQL.Field((_type) => [CommercialClass], {
    nullable: true,
  })
  notIn?: Array<"COMMERCIAL" | "SEEDSTOCK" | "PET"> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumCommercialClassNullableFilter, {
    nullable: true,
  })
  not?: NestedEnumCommercialClassNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  isSet?: boolean | undefined;
}
