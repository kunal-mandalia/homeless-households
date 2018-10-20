declare interface IHomelessHouseholds {
  id: number,
  need: string,
  decision: string,
}

declare interface IQueryHomelessHouseholds {
  getHomelessHouseholds: IHomelessHouseholds[]
}
