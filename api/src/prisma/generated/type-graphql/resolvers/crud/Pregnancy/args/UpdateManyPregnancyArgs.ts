import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyUpdateManyMutationInput } from "../../../inputs/PregnancyUpdateManyMutationInput";
import { PregnancyWhereInput } from "../../../inputs/PregnancyWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyPregnancyArgs {
  @TypeGraphQL.Field((_type) => PregnancyUpdateManyMutationInput, {
    nullable: false,
  })
  data!: PregnancyUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  where?: PregnancyWhereInput | undefined;
}
