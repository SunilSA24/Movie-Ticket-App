import { Tabs } from "antd"
import TheaterListPartner from "./TheatreListPartner"

function Partner() {
    const tabItem = [
        {
            key: '1',
            label: 'Theater List',
            children: <TheaterListPartner />
        },
        
    ]
  return (
    <div className="md-5">
        <Tabs items={tabItem} />     
    </div>
  )
}

export default Partner