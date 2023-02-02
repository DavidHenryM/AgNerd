import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyWhereInput } from "../../../inputs/PregnancyWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyPregnancyArgs {
  @TypeGraphQL.Field(_type => PregnancyWhereInput, {
    nullable: true
  })
  where?: PregnancyWhereInput | undefined;
}
