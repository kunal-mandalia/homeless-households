import { filteredHomelessHouseholds } from '../../__fixtures__/filteredHomelessHouseholds'
import { homelessHouseholds } from '../../__fixtures__/homelessHouseholds'
import { prepareDataset } from './Decision'

describe('Decision component', () => {
  describe('prepareDataset', () => {
    it('should return dataset for Pie chart', () => {
      // arrange
      // act
      const result = prepareDataset(filteredHomelessHouseholds, homelessHouseholds, true);
      // assert
      expect(result).toMatchObject(
        [{"name": "approved permanent rehous", "value": 1}, {"name": "no priority need", "value": 1}]
      )
    })
  })
})