import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointScalarWhereInput } from "../inputs/GeoPointScalarWhereInput";
import { GeoPointUpdateManyMutationInput } from "../inputs/GeoPointUpdateManyMutationInput";

@TypeGraphQL.InputType("GeoPointUpdateManyWithWhereWithoutPaddockInput", {
  isAbstract: true
})
export class GeoPointUpdateManyWithWhereWithoutPaddockInput {
  @TypeGraphQL.Field(_type => GeoPointScalarWhereInput, {
    nullable: false
  })
  where!: GeoPointScalarWhereInput;

  @TypeGraphQL.Field(_type => GeoPointUpdateManyMutationInput, {
    nullable: false
  })
  data!: GeoPointUpdateManyMutationInput;
}
