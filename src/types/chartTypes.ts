import { ChartComponent } from "chart.js";

export interface ZoomableChartComponent extends ChartComponent {
    resetZoom: (mode?: string) => void;
}
