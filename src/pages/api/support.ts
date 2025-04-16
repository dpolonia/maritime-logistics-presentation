import type { NextApiRequest, NextApiResponse } from 'next';

type SupportRequest = {
  sessionId: number;
  name: string;
  email: string;
  issueType: 'technical' | 'content' | 'access' | 'other';
  description: string;
  urgency: 'low' | 'medium' | 'high';
  browser?: string;
  device?: string;
  timestamp: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; ticketId?: string } | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supportData: SupportRequest = {
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    // Validate required fields
    if (!supportData.sessionId || !supportData.email || !supportData.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a production environment, this would create a support ticket
    // in a ticketing system like Zendesk, Freshdesk, etc.
    console.log('SUPPORT REQUEST:', JSON.stringify(supportData));

    // Generate a ticket ID for the request
    const ticketId = `ticket_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // For high urgency issues, implement immediate notification
    if (supportData.urgency === 'high') {
      // In production, this would send immediate notifications to support staff
      console.warn('URGENT SUPPORT REQUEST:', {
        ticketId,
        sessionId: supportData.sessionId,
        issueType: supportData.issueType,
        email: supportData.email,
      });
    }

    return res.status(200).json({ success: true, ticketId });
  } catch (error) {
    console.error('Support request error:', error);
    return res.status(500).json({ error: 'Failed to process support request' });
  }
}
