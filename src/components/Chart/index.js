import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts';

const RenderChart = ({ data }) => {
  return (
    <ResponsiveContainer height={250}>
      <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="48%" stopColor="#F9438F" stopOpacity={0.3}/>
            <stop offset="84%" stopColor="#F9438F" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="x" />
        <YAxis allowDecimals={false} width={30} tickSize={6}/>
        <Tooltip
          animationEasing={"ease-in-out"}
          content={({active, payload}) => {
            return active ? (
              <div>
                {payload.map((row, index) => {
                  return (
                    <div key={index}>
                      <div>{row.value}</div>
                    </div>
                  )
                })}
              </div>
            ) : null;
          }}
          wrapperStyle={{
            outline: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 4,
            padding: '5px 8px',
            fontWeight: 500,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}
          cursor={false}
        />
        <Area type="linear" dataKey="y" stroke="#F9438F" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)"/>
      </AreaChart>
    </ResponsiveContainer>
  )
};

export default RenderChart;