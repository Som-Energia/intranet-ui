import React, { useState } from 'react'
import * as dayjs from 'dayjs'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const AnalyticsBarChart = (props) => {
  const { data, mainValue, secondaryValue } = props

  const formatLabel = (value) => {
    return dayjs(value).format('dddd, DD/MM/YYYY')
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid
          stroke="#616161"
          strokeWidth={0.5}
          strokeDasharray="3 5"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 14 }}
          tickFormatter={(tickItem) => `${dayjs(tickItem).format('ddd, D')}`}
        />
        <YAxis
          type="number"
          domain={[0, 'auto']}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 16 }}
        />
        <Tooltip
          cursor={{ fill: '#f2f2f2' }}
          labelFormatter={formatLabel}
          separator=" "
        />
        <Bar dataKey={mainValue} stackId="1" fill="#96b633" />
        <Bar dataKey={secondaryValue} stackId="1" fill="#db5f5b" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AnalyticsBarChart
