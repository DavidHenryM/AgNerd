import { DocumentNode, gql } from "@apollo/client"

export function getActiveLivestockQuery(): {query: DocumentNode, variables: any} {
    const query = gql`
    query LivestockUnits($where: LivestockUnitWhereInput, $orderBy: [WeightRecordOrderByWithRelationInput!]) {
      livestockUnits(where: $where) {
        id
        name
        class
        sex
        desexed
        visualIdLine1
        visualIdLine2
        visualIdLine3
        visualIdBackgroundColour
        visualIdTextColour
        nlisId
        birthDate
        angusTechId
        active
        weights(orderBy: $orderBy) {
          weight
          dateMeasured
          method
        }
      }
    }`
    const variables = {
      "where": {
        "active": {
          "equals": true
        }
      },
      "orderBy": [
        {
          "dateMeasured": "asc"
        }
      ]
    }
    return {query: query, variables: variables}
  }