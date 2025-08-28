import { Brain, Share2, ShieldCheck, Users } from 'lucide-react';

import ai_features from '@/assets/ai-features.png';
import collaboration_tools from '@/assets/collaboration-tools.png';
import security_features from '@/assets/security-features.png';
import video_conference_dashboard from '@/assets/video-conference-dashboard.png';

export const features = [
  {
    title: 'AI-Powered Meeting Assistant',
    description:
      'Automated meeting notes, transcription, and action item extraction powered by advanced AI technology.',
    icon: <Brain className="h-6 w-6" />,
    image: ai_features,
  },
  {
    title: 'Seamless Collaboration Tools',
    description:
      'Real-time screen sharing, whiteboard, document collaboration, and annotation tools for productive meetings.',
    icon: <Share2 className="h-6 w-6" />,
    image: collaboration_tools,
  },
  {
    title: 'Enterprise-Grade Security',
    description:
      'End-to-end encryption, waiting rooms, meeting locks, and admin controls to keep your meetings secure.',
    icon: <ShieldCheck className="h-6 w-6" />,
    image: security_features,
  },
  {
    title: 'Team Management',
    description:
      'Advanced user management, role-based permissions, and team analytics to optimize your communication.',
    icon: <Users className="h-6 w-6" />,
    image: video_conference_dashboard,
  },
];
