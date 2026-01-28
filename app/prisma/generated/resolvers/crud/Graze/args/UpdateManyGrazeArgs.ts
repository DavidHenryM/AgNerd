import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeUpdateManyMutationInput } from "../../../inputs/GrazeUpdateManyMutationInput";
import { GrazeWhereInput } from "../../../inputs/GrazeWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyGrazeArgs {
  @TypeGraphQL.Field((_type) => GrazeUpdateManyMutationInput, {
    nullable: false,
  })
  data!: GrazeUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => GrazeWhereInput, {
    nullable: true,
  })
  where?: GrazeWhereInput | undefined;
}
