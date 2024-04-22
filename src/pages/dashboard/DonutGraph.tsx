import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface DonutGraphProps {
  totalLessons: number;
  completedLessons: number[];
}

const DonutGraph = ({ totalLessons, completedLessons }: DonutGraphProps) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart<"doughnut"> | null = null;

    const drawPercentage = (
      ctx: CanvasRenderingContext2D,
      percentage: number
    ) => {
      const canvas = chartContainer.current;
      if (canvas) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const fontSize = Math.min(canvas.width, canvas.height) * 0.1;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${percentage}% hi`, centerX, centerY);
      }
    };

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      if (ctx) {
        chartInstance = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Completed Lessons", "Remaining Lessons"],
            datasets: [
              {
                data: [
                  completedLessons.length,
                  totalLessons - completedLessons.length,
                ],
                backgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          },
          options: {
            cutout: "80%",
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
              title: {
                display: true,
                text: "Course Progress",
                padding: 20,
              },
            },
          },
        });
      }
    }

    if (chartInstance && completedLessons.length > 0) {
      const percentage = Math.round(
        (completedLessons.length / totalLessons) * 100
      );
      drawPercentage(chartInstance.ctx, percentage);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [totalLessons, completedLessons]);

  return <canvas ref={chartContainer} />;
};

export default DonutGraph;
