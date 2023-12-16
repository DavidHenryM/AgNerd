import * as TypeGraphQL from "type-graphql";
import { PrismaClient } from "@prisma/client";
import type { GraphQLResolveInfo } from "graphql";
import fetch from 'node-fetch'
import { AngusTechResponse, AngusTechBeastData, EbvDef, EbvDefs } from "./types";
import {
  EstimatedBreedingValueResult,
  AffectedRowsOutput, 
  CreateManyEstimatedBreedingValueResultArgs,
  EstimatedBreedingValueResultCreateManyInput
} from "../generated";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../generated/helpers";


const ANGUS_TECH_BASE_URL = 'https://angus.tech/api/animal-enq';
const prisma = new PrismaClient();

@TypeGraphQL.InputType("LivestockUnitIdInput", {
  isAbstract: true,
})
export class LivestockUnitIdInput {
@TypeGraphQL.Field((_type) => String, {
  nullable: false,
})
id!: string;
}

@TypeGraphQL.ArgsType()
export class LivestockUnitIdArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitIdInput, {
    nullable: false,
  })
  data!: LivestockUnitIdInput
}

@TypeGraphQL.InputType("AngusTechIdInput", {
  isAbstract: true,
})
export class AngusTechIdInput {
@TypeGraphQL.Field((_type) => String, {
  nullable: false,
})
angusTechId!: string;
}

@TypeGraphQL.ArgsType()
export class AngusTechIdArgs {
  @TypeGraphQL.Field((_type) => AngusTechIdInput, {
    nullable: false,
  })
  data!: AngusTechIdInput
}



async function getAngusTechBeastData(angusTechId: string | undefined) {
  if (angusTechId) {
    console.log(angusTechId);
    const url: RequestInfo = `${ANGUS_TECH_BASE_URL}?tql=id+is+%27${angusTechId}%27&execute=1`;
    console.log(url);
    const options: any = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        AcceptEncoding: 'gzip, deflate, br',
        Connection: 'keep-alive'
      },
    }
    const response = await fetch(url, options);
    const responseJson : AngusTechResponse = await response.json(); 
    if (responseJson.result.tql.isValid) {
      console.log('data valid');
      const data: AngusTechBeastData = responseJson.result.rows[0];
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function findAngusTechField(
  ebvDef: EbvDef,
  beastData: AngusTechBeastData,
  beastId: string): EstimatedBreedingValueResultCreateManyInput | undefined {
    type BeastDataKey = keyof typeof beastData;
    if (
      ebvDef.angusTechFieldNameValue && 
      ebvDef.angusTechFieldNamePercentile &&
      ebvDef.angusTechFieldNameAccuracy
      ) {
        return {
          value: Number(beastData[ebvDef.angusTechFieldNameValue as BeastDataKey]),
          percentile: Number(beastData[ebvDef.angusTechFieldNamePercentile as BeastDataKey]),
          accuracy:  Number(String(beastData[ebvDef.angusTechFieldNameAccuracy as BeastDataKey]).replace('%',''))/100.0,
          livestockUnitId: beastId,
          estimatedBreedingValueDefinitionId: ebvDef.id
        }
      }
    };


async function parseEBVResults(beastData: AngusTechBeastData, beastId: string): Promise<EstimatedBreedingValueResultCreateManyInput[]> {
  const ebvDefs: EbvDefs = await prisma.estimatedBreedingValueDefinition.findMany(
    {
      select: {
        angusTechFieldNameValue: true,
        angusTechFieldNameAccuracy: true,
        angusTechFieldNamePercentile: true,
        id: true,
      }
    }
  );
  let ebvInputs: EstimatedBreedingValueResultCreateManyInput[] = [];
  ebvDefs.forEach((ebvDef) => {
    const ebvInput = findAngusTechField(ebvDef, beastData, beastId);
    if(ebvInput) {
      ebvInputs.push(ebvInput);
    }
  })
  return ebvInputs;
}



@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class CreateOneEstimatedBreedingValueFromAngusTechResolver {
  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyEstimatedBreedingValueFromAngusTech(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitIdArgs
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    const livestockUnit = await prisma.livestockUnit.findFirst({where: {id: {equals: args.data.id}}});
    if (livestockUnit?.angusTechId) {
      const beastData = await getAngusTechBeastData(livestockUnit.angusTechId);
      if (beastData) {
        const ebvs: EstimatedBreedingValueResultCreateManyInput[] = await parseEBVResults(beastData, args.data.id);
        return getPrismaFromContext(ctx).estimatedBreedingValueResult.createMany({
          ...{data: ebvs},
          ...(_count && transformCountFieldIntoSelectRelationsCount(_count))
        })
      }
    }
    return {count: 0};
  }
}





export const customResolvers = [
  CreateOneEstimatedBreedingValueFromAngusTechResolver,

]

