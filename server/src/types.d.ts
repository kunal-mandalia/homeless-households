import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';

// https://michalzalecki.com/using-sequelize-with-typescript/
declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
  };
}
