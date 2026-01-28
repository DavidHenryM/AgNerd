import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestUpdateManyMutationInput } from "../../../inputs/PregnancyTestUpdateManyMutationInput";
import { PregnancyTestWhereInput } from "../../../inputs/PregnancyTestWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyPregnancyTestArgs {
  @TypeGraphQL.Field((_type) => PregnancyTestUpdateManyMutationInput, {
    nullable: false,
  })
  data!: PregnancyTestUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => PregnancyTestWhereInput, {
    nullable: true,
  })
  where?: PregnancyTestWhereInput | undefined;
}
