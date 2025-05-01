import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StarIcon from '@mui/icons-material/Star';
import { useInView } from 'react-intersection-observer';
import { ReactElement, useState, useEffect } from 'react';

// Add custom styles to override the default ones
const customStyles = `
  .vertical-timeline-element-content {
    background: rgb(31, 41, 55) !important;
    box-shadow: none !important;
    padding: 1rem !important;
    border-radius: 0.5rem !important;
  }
  .vertical-timeline-element-content-arrow {
    display: none !important;
  }
  .vertical-timeline-element-date {
    display: none !important;
  }
  .vertical-timeline-element-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: 'Inter' !important;
    font-weight: 600 !important;
  }
  .vertical-timeline-element:last-child .vertical-timeline-element-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .vertical-timeline-element:last-child .vertical-timeline-element-icon svg {
    width: 24px !important;
    height: 24px !important;
  }
`;

interface TimelineStep {
  title: string;
  content: string;
  index: number;
}

interface VerticalTimelineProps {
  steps: TimelineStep[];
}

interface TimelineElementStyle {
  background: string;
  color: string;
  boxShadow?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
}

const VerticalTimelineComponent = ({ steps }: VerticalTimelineProps): ReactElement => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    } else {
      setIsInView(false);
    }
  }, [inView]);

  const contentStyle: TimelineElementStyle = {
    background: 'rgb(31, 41, 55)',
    color: 'rgb(200, 195, 188)',
    boxShadow: 'none',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  const iconStyle: TimelineElementStyle = {
    background: 'rgb(33, 150, 243)',
    color: '#fff',
    boxShadow: '0 0 0 4px rgb(33, 33, 33)'
  };

  const endIconStyle: TimelineElementStyle = {
    background: 'rgb(16, 204, 82)',
    color: '#fff',
    boxShadow: '0 0 0 4px rgb(33, 33, 33)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <section ref={ref}>
      <style jsx global>{customStyles}</style>
      <VerticalTimeline 
        animate={true} 
        layout="1-column-left"
        lineColor="rgb(60, 60, 60)"
      >
        {steps.map((step, index) => (
          <VerticalTimelineElement
            key={index}
            visible={isInView}
            className="vertical-timeline-element--work"
            contentStyle={contentStyle}
            contentArrowStyle={{ display: 'none' }}
            date=""
            iconStyle={iconStyle}
            icon={<span>{step.index}</span>}
          >
            <h3 
              className="vertical-timeline-element-title"
              style={{ 
                fontSize: '1.5rem',
                fontWeight: 700,
                marginTop: '2rem',
                marginBottom: '1rem',
                color: 'rgb(200, 195, 188)',
                fontFamily: "'Inter'"
              }}
            >
              {step.title}
            </h3>
            <div 
              className="vertical-timeline-element-content"
              style={{ 
                color: 'rgb(200, 195, 188)',
                fontFamily: 'Inter',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}
              dangerouslySetInnerHTML={{ __html: step.content }}
            />
          </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
          visible={isInView}
          iconStyle={endIconStyle}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </section>
  );
};

export default VerticalTimelineComponent;