import type { NextApiRequest, NextApiResponse } from 'next';

type MetricData = {
  type: string;
  value: number;
  sessionId?: number;
  userId?: string;
  deviceInfo?: {
    type: string;
    browser: string;
    os: string;
  };
  timestamp: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; metricId?: string } | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const metricData: MetricData = {
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    // Validate required fields
    if (!metricData.type || typeof metricData.value !== 'number') {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a production environment, this would send metrics to a monitoring service
    // like Datadog, New Relic, or CloudWatch
    console.log('METRIC:', JSON.stringify(metricData));

    // Generate a unique ID for the metric (useful for frontend tracking)
    const metricId = `metric_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Check for performance thresholds and trigger alerts if necessary
    if (metricData.type === 'page_load' && metricData.value > 3000) {
      // In production, this would trigger performance alerts
      console.warn('PERFORMANCE ALERT: Slow page load detected', {
        value: metricData.value,
        sessionId: metricData.sessionId,
        deviceInfo: metricData.deviceInfo,
      });
    }

    return res.status(200).json({ success: true, metricId });
  } catch (error) {
    console.error('Monitoring error:', error);
    return res.status(500).json({ error: 'Failed to process metric data' });
  }
}
