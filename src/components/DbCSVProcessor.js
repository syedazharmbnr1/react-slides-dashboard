import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import Papa from 'papaparse';
import _ from 'lodash';

const DbCSVProcessor = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const processCSV = async () => {
      try {
        const response = await window.fs.readFile('public/data/sgw_pgw_30.csv', { encoding: 'utf8' });
        Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data);
            
            // Calculate summary statistics
            const totalCount = _.sumBy(results.data, 'Total Count');
            const totalFailed = _.sumBy(results.data, 'Failed');
            const avgFailureRate = (totalFailed / totalCount) * 100;
            
            setSummary({
              totalCount,
              totalFailed,
              avgFailureRate: avgFailureRate.toFixed(2)
            });
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    processCSV();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enhanced CSV Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">Total Count</h3>
              <p className="text-2xl font-bold text-blue-900">{summary.totalCount.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700">Total Failed</h3>
              <p className="text-2xl font-bold text-red-900">{summary.totalFailed.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-700">Average Failure Rate</h3>
              <p className="text-2xl font-bold text-yellow-900">{summary.avgFailureRate}%</p>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failure Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.Context}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row['Total Count']}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Failed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((row.Failed / row['Total Count']) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DbCSVProcessor;