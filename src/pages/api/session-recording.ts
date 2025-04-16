import type { NextApiRequest, NextApiResponse } from 'next';

type RecordingData = {
  sessionId: number;
  timestamp: string;
  events: Array<{
    type: string;
    timestamp: number;
    data: any;
  }>;
  metadata?: {
    userId?: string;
    browser?: string;
    os?: string;
    deviceType?: string;
  };
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; recordingId?: string } | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const recordingData: RecordingData = {
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    // Validate required fields
    if (!recordingData.sessionId || !Array.isArray(recordingData.events)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a production environment, this would store the session recording data
    // in a database or object storage service
    console.log('SESSION RECORDING:', JSON.stringify({
      sessionId: recordingData.sessionId,
      timestamp: recordingData.timestamp,
      eventCount: recordingData.events.length,
      metadata: recordingData.metadata,
    }));

    // Generate a unique ID for the recording
    const recordingId = `rec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return res.status(200).json({ success: true, recordingId });
  } catch (error) {
    console.error('Session recording error:', error);
    return res.status(500).json({ error: 'Failed to process session recording data' });
  }
}
