import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const S1MmeProtocol98 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fs.readFile('public/data/s1_mme_protol_state_98_summary.csv', { encoding: 'utf8' });
        Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>S1 MME Protocol Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="DateTime" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="MSJE01" stroke="#8884d8" />
              <Line type="monotone" dataKey="MSJE02" stroke="#82ca9d" />
              <Line type="monotone" dataKey="MSRE01" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default S1MmeProtocol98;