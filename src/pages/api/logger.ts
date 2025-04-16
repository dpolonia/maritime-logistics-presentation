import type { NextApiRequest, NextApiResponse } from 'next';

type LogData = {
  type: string;
  message: string;
  sessionId?: number;
  slideType?: string;
  metadata?: Record<string, any>;
  timestamp: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const logData: LogData = {
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    // In a production environment, this would send logs to a persistent storage
    // or monitoring service like Datadog, Sentry, or CloudWatch
    console.log('LOG:', JSON.stringify(logData));

    // Parse error events for alerting
    if (logData.type === 'error') {
      // In production, this would trigger alerts via email, Slack, PagerDuty, etc.
      console.error('ERROR ALERT:', logData.message, logData.metadata);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logging error:', error);
    return res.status(500).json({ error: 'Failed to log data' });
  }
}
