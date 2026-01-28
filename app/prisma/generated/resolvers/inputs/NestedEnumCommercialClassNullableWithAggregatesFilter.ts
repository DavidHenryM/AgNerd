import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumCommercialClassNullableFilter } from "../inputs/NestedEnumCommercialClassNullableFilter";
import { NestedIntNullableFilter } from "../inputs/NestedIntNullableFilter";
import { CommercialClass } from "../../enums/CommercialClass";

@TypeGraphQL.InputType(
  "NestedEnumCommercialClassNullableWithAggregatesFilter",
  {},
)
export class NestedEnumCommercialClassNullableWithAggregatesFilter {
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

  @TypeGraphQL.Field(
    (_type) => NestedEnumCommercialClassNullableWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  not?: NestedEnumCommercialClassNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntNullableFilter, {
    nullable: true,
  })
  _count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumCommercialClassNullableFilter, {
    nullable: true,
  })
  _min?: NestedEnumCommercialClassNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumCommercialClassNullableFilter, {
    nullable: true,
  })
  _max?: NestedEnumCommercialClassNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  isSet?: boolean | undefined;
}
