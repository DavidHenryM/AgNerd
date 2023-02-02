import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestWhereInput } from "../../../inputs/PregnancyTestWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyPregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestWhereInput, {
    nullable: true
  })
  where?: PregnancyTestWhereInput | undefined;
}
