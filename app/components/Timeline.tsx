import { Chrono } from "react-chrono";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";

interface TimelineProps {
  items: TimelineItemModel[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Chrono
        items={items}
        mode="VERTICAL"
        theme={{
          primary: "rgb(33, 150, 243)",
          secondary: "rgb(233, 30, 99)",
          cardBgColor: "rgb(33, 33, 33)",
          cardForeColor: "white",
          titleColor: "white",
          titleColorActive: "rgb(33, 150, 243)",
        }}
        cardHeight={100}
        slideShow
        slideItemDuration={3000}
        enableOutline
        hideControls={false}
        scrollable
        useReadMore={false}
      />
    </div>
  );
};

export default Timeline; 