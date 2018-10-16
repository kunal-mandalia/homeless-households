import * as csvtojson from "csvtojson";
import * as path from "path";
import { QueryInterface } from "sequelize";
import { logger } from "../../lib/logger"

interface ICSVRow {
  Age: number,
  Decision: string,
  DecisionCode: number,
  DecisionDate: string,
  Ethnicity: string,
  Nationality: string,
  Need: string,
  ["Publisher Label"]: string,
  ["Publisher URI"]: string,
  Reason: string,
  RegistrationDate: string,
}

function britishToUTCDate(datetime: string): Date {
  const [DD, MM, YYYY] = datetime.split(" ")[0].split("/");
  const date = new Date(Date.UTC(Number(YYYY), Number(MM) - 1, Number(DD)));
  return date;
}

function csvRowToRecord(row: ICSVRow) {
  return {
    age: row.Age,
    createdAt: new Date(),
    decision: row.Decision,
    decisionCode: row.DecisionCode,
    decisionDate: britishToUTCDate(row.DecisionDate),
    ethnicity: row.Ethnicity,
    nationality: row.Nationality,
    need: row.Need,
    publisherLabel: row["Publisher Label"],
    publisherUri: row["Publisher URI"],
    reason: row.Reason,
    registrationDate: britishToUTCDate(row.RegistrationDate),
    updatedAt: new Date(),
  };
}

async function getSeedData() {
  try {
    const filePath = path.join(__dirname, "/../../../data/homeless-households.csv");
    const rows = await csvtojson().fromFile(filePath);
    const records = rows.map(csvRowToRecord);
    return records;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export default {
  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete("homeless_households", {}, {}),
  up: async (queryInterface: QueryInterface) => {
    const records = await getSeedData();
    return queryInterface.bulkInsert("homeless_households", records, {});
  },
}
