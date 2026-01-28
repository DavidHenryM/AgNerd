import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CommercialClass } from "../../enums/CommercialClass";

@TypeGraphQL.InputType(
  "NullableEnumCommercialClassFieldUpdateOperationsInput",
  {},
)
export class NullableEnumCommercialClassFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => CommercialClass, {
    nullable: true,
  })
  set?: "COMMERCIAL" | "SEEDSTOCK" | "PET" | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  unset?: boolean | undefined;
}
