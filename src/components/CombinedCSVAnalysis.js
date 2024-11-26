import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

const CombinedCSVAnalysis = () => {
  const [data, setData] = useState({
    deviceData: [],
    networkData: [],
    protocolData: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load device model data
        const deviceResponse = await window.fs.readFile('public/data/S5_S8__device_model_output.csv', { encoding: 'utf8' });
        const deviceData = await new Promise(resolve => {
          Papa.parse(deviceResponse, {
            header: true,
            dynamicTyping: true,
            complete: (results) => resolve(results.data)
          });
        });

        // Load network data
        const networkResponse = await window.fs.readFile('public/data/formatted_output_sgw_pgw_64_Context_new.csv', { encoding: 'utf8' });
        const networkData = await new Promise(resolve => {
          Papa.parse(networkResponse, {
            header: true,
            dynamicTyping: true,
            complete: (results) => resolve(results.data)
          });
        });

        // Load protocol data
        const protocolResponse = await window.fs.readFile('public/data/s1_mme_protol_state_98_summary.csv', { encoding: 'utf8' });
        const protocolData = await new Promise(resolve => {
          Papa.parse(protocolResponse, {
            header: true,
            dynamicTyping: true,
            complete: (results) => resolve(results.data)
          });
        });

        setData({
          deviceData,
          networkData,
          protocolData
        });

      } catch (error) {
        console.error('Error reading files:', error);
      }
    };

    fetchData();
  }, []);

  // Process data for visualization
  const processedData = data.networkData.map((item, index) => ({
    DateTime: item.DateTime,
    NetworkLoad: _.sum(Object.values(_.omit(item, ['DateTime']))),
    ProtocolEvents: data.protocolData[index] ? 
      _.sum(Object.values(_.omit(data.protocolData[index], ['DateTime']))) : 0,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Combined Network Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DateTime" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="NetworkLoad" 
                  stroke="#8884d8"
                  name="Network Load"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="ProtocolEvents" 
                  stroke="#82ca9d"
                  name="Protocol Events"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CombinedCSVAnalysis;