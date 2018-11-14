import * as React from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';
import { Tile } from './Tile'

const defaultData = [
  { subject: 'Math', A: 77, fullMark: 100 },
  { subject: 'Chinese', A: 98, fullMark: 100 },
  { subject: 'English', A: 86, fullMark: 100 },
  { subject: 'Geography', A: 99, fullMark: 100 },
  { subject: 'Physics', A: 85, fullMark: 100 },
  { subject: 'History', A: 65, fullMark: 100 },
];

export const Decision = ({ data = defaultData }) => (
    <RadarChart cx={"50%"} cy={"50%"} outerRadius={100} width={300} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis/>
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
    </RadarChart>
);

export default Tile(Decision)("Outcomes");
