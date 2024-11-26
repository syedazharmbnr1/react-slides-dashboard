import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import Papa from 'papaparse';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Pgw64ContextVendorAnalysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fs.readFile('public/data/formatted_output_sgw_pgw_64_Context_new.csv', { encoding: 'utf8' });
        Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const vendorData = results.data
              .filter(item => item.Vendor && item.Total)
              .map(item => ({
                name: item.Vendor,
                value: item.Total
              }));
            setData(vendorData);
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
        <CardTitle>PGW Vendor Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Pgw64ContextVendorAnalysis;