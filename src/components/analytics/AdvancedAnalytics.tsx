import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Shield, 
  Calendar, 
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  BarChart3
} from 'lucide-react';

// Mock data for analytics - in production this would come from the backend
const mockAnalyticsData = {
  cropHealthScore: 87,
  diseaseDetections: [
    { month: 'Jan', count: 12, severity: 'low' },
    { month: 'Feb', count: 18, severity: 'medium' },
    { month: 'Mar', count: 8, severity: 'low' },
    { month: 'Apr', count: 25, severity: 'high' },
    { month: 'May', count: 15, severity: 'medium' },
    { month: 'Jun', count: 10, severity: 'low' }
  ],
  diseaseTypes: [
    { name: 'Fungal', value: 45, color: '#8884d8' },
    { name: 'Bacterial', value: 25, color: '#82ca9d' },
    { name: 'Viral', value: 20, color: '#ffc658' },
    { name: 'Pest', value: 10, color: '#ff7300' }
  ],
  seasonalPredictions: [
    { season: 'Summer', risk: 'High', diseases: ['Late Blight', 'Powdery Mildew'], probability: 75 },
    { season: 'Rainy', risk: 'Very High', diseases: ['Bacterial Spot', 'Fungal Rot'], probability: 90 },
    { season: 'Winter', risk: 'Low', diseases: ['Aphid Infestation'], probability: 30 }
  ],
  roiCalculator: {
    totalScans: 156,
    diseasesCaught: 42,
    estimatedSavings: 15750,
    treatmentCosts: 3200,
    netBenefit: 12550
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdvancedAnalytics: React.FC = () => {
  // Calculate health score status
  const healthStatus = useMemo(() => {
    const score = mockAnalyticsData.cropHealthScore;
    if (score >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 60) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 40) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  }, []);

  // Calculate trend for disease detections
  const diseaseTrend = useMemo(() => {
    const recent = mockAnalyticsData.diseaseDetections.slice(-3);
    const earlier = mockAnalyticsData.diseaseDetections.slice(-6, -3);
    const recentAvg = recent.reduce((sum, item) => sum + item.count, 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, item) => sum + item.count, 0) / earlier.length;
    const trend = recentAvg > earlierAvg ? 'up' : 'down';
    const percentage = Math.abs(((recentAvg - earlierAvg) / earlierAvg) * 100).toFixed(1);
    return { trend, percentage };
  }, []);

  return (
    <div className="space-y-6">
      {/* Crop Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Overall Crop Health Score
            </CardTitle>
            <CardDescription>
              AI-powered assessment of your plants' overall health status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl font-bold text-green-600">
                {mockAnalyticsData.cropHealthScore}
              </div>
              <Badge className={`${healthStatus.bgColor} ${healthStatus.color} text-lg px-4 py-2`}>
                {healthStatus.status}
              </Badge>
            </div>
            <Progress value={mockAnalyticsData.cropHealthScore} className="h-3 mb-2" />
            <p className="text-sm text-gray-600">
              Based on {mockAnalyticsData.roiCalculator.totalScans} scans and disease detection patterns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Disease Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {diseaseTrend.trend === 'up' ? (
                <TrendingUp className="h-5 w-5 text-red-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-green-500" />
              )}
              <span className={`text-lg font-semibold ${diseaseTrend.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                {diseaseTrend.percentage}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Disease detections are {diseaseTrend.trend === 'up' ? 'increasing' : 'decreasing'} compared to previous months
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Disease Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Disease Detection Trends
            </CardTitle>
            <CardDescription>
              Monthly disease detection patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalyticsData.diseaseDetections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Disease Types Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of detected disease categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalyticsData.diseaseTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockAnalyticsData.diseaseTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Seasonal Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-600" />
            AI-Powered Seasonal Disease Predictions
          </CardTitle>
          <CardDescription>
            Forecast of disease risks based on seasonal patterns and climate data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAnalyticsData.seasonalPredictions.map((prediction, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{prediction.season} Season</h4>
                  <Badge variant={
                    prediction.risk === 'Very High' ? 'destructive' : 
                    prediction.risk === 'High' ? 'default' : 
                    'secondary'
                  }>
                    {prediction.risk} Risk
                  </Badge>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Probability</span>
                    <span>{prediction.probability}%</span>
                  </div>
                  <Progress value={prediction.probability} className="h-2" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Expected Diseases:</p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.diseases.map((disease, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {disease}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Return on Investment (ROI) Calculator
          </CardTitle>
          <CardDescription>
            Track cost savings from early disease detection and prevention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Total Scans</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {mockAnalyticsData.roiCalculator.totalScans}
              </div>
              <p className="text-sm text-blue-600">This month</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Diseases Caught</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {mockAnalyticsData.roiCalculator.diseasesCaught}
              </div>
              <p className="text-sm text-red-600">Early detection</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Estimated Savings</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                KSh {mockAnalyticsData.roiCalculator.estimatedSavings.toLocaleString()}
              </div>
              <p className="text-sm text-green-600">Crop loss prevented</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">Net Benefit</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                KSh {mockAnalyticsData.roiCalculator.netBenefit.toLocaleString()}
              </div>
              <p className="text-sm text-purple-600">Total ROI</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">💡 ROI Insights</h4>
            <p className="text-sm text-green-700">
              Your early disease detection has prevented an estimated <strong>KSh {mockAnalyticsData.roiCalculator.estimatedSavings.toLocaleString()}</strong> in crop losses. 
              With treatment costs of KSh {mockAnalyticsData.roiCalculator.treatmentCosts.toLocaleString()}, 
              your net savings are <strong>KSh {mockAnalyticsData.roiCalculator.netBenefit.toLocaleString()}</strong> this month.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;