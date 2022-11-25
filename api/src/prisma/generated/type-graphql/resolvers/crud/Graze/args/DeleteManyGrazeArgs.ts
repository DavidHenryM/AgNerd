import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeWhereInput } from "../../../inputs/GrazeWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyGrazeArgs {
  @TypeGraphQL.Field(_type => GrazeWhereInput, {
    nullable: true
  })
  where?: GrazeWhereInput | undefined;
}
