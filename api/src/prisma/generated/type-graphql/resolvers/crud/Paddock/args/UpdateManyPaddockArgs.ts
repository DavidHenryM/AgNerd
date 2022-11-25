import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockUpdateManyMutationInput } from "../../../inputs/PaddockUpdateManyMutationInput";
import { PaddockWhereInput } from "../../../inputs/PaddockWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyPaddockArgs {
  @TypeGraphQL.Field(_type => PaddockUpdateManyMutationInput, {
    nullable: false
  })
  data!: PaddockUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => PaddockWhereInput, {
    nullable: true
  })
  where?: PaddockWhereInput | undefined;
}
