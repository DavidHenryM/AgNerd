import { DocumentNode, gql } from "@apollo/client"

export function setLivestockUnitInactiveMutation(livestockUnitId: string): { mutation: DocumentNode, variables: any} {
    const mutation = gql`
    mutation UpdateOneLivestockUnit($where: LivestockUnitWhereUniqueInput!, $data: LivestockUnitUpdateInput!) {
      updateOneLivestockUnit(where: $where, data: $data) {
        id
        name
        active
      }
    }`
    const variables = {
      "where": {
        "id": livestockUnitId
        },
      "data": {
        "active": {
            "set": false
        }
      },
    }
    
    return  { mutation: mutation, variables: variables }
  }