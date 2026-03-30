import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar, Radar } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  PointElement,
  LineElement
)

export default function ResultsCharts({ analysis }) {
  const barData = {
    labels: analysis.recommended.map((item) => item.name),
    datasets: [
      {
        label: 'Suitability Score',
        data: analysis.recommended.map((item) => item.score),
        backgroundColor: 'rgba(76, 175, 80, 0.55)',
        borderRadius: 8,
      },
    ],
  }

  const radarData = {
    labels: ['Barrier', 'Hydration', 'Tolerance', 'Glow', 'Oil Balance', 'Value'],
    datasets: [
      {
        label: 'Profile Match',
        data: [88, 84, 81, 73, 86, 80],
        backgroundColor: 'rgba(91, 164, 207, 0.2)',
        borderColor: 'rgba(91, 164, 207, 1)',
        borderWidth: 2,
      },
    ],
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <div className="charts-grid">
      <div className="card chart-card">
        <h3>Top ingredient suitability</h3>
        <p className="muted">Higher scores suggest a better match for the selected profile.</p>
        <div className="chart-box">
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>

      <div className="card chart-card">
        <h3>Routine profile balance</h3>
        <p className="muted">A quick view of how the suggested routine is distributed.</p>
        <div className="chart-box">
          <Radar data={radarData} options={commonOptions} />
        </div>
      </div>
    </div>
  )
}
