import * as Sequelize from 'sequelize';

export interface IHomelessHouseholdsAttributes {
    id?: number;
    age: number;
    createdAt?: Date;
    decision: string;
    decisionCode: number;
    decisionDate: Date;
    ethnicity: string;
    nationality: string;
    need: string;
    publisherLabel: string;
    publisherUri: string;
    reason: string;
    registrationDate: Date;
    updatedAt?: Date;
};

export interface IHomelessHouseholdsInstance extends Sequelize.Instance<IHomelessHouseholdsAttributes>, IHomelessHouseholdsAttributes {};

export default (sequelize: Sequelize.Sequelize): Sequelize.Model<IHomelessHouseholdsInstance, IHomelessHouseholdsAttributes> => {
    const attributes: SequelizeAttributes<IHomelessHouseholdsAttributes> = {
        age: Sequelize.INTEGER,
        createdAt: {
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        type: Sequelize.DATE,
        },
        decision: Sequelize.STRING,
        decisionCode: Sequelize.INTEGER,
        decisionDate: Sequelize.DATE,
        ethnicity: Sequelize.STRING,
        nationality: Sequelize.STRING,
        need: Sequelize.STRING,
        publisherLabel: Sequelize.STRING,
        publisherUri: Sequelize.STRING,
        reason: Sequelize.STRING,
        registrationDate: Sequelize.DATE,
        updatedAt: {
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
        type: Sequelize.DATE,
        },
    }
    return sequelize.define<IHomelessHouseholdsInstance, IHomelessHouseholdsAttributes>("HomelessHouseholds", attributes);
};