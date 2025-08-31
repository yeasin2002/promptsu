import { Brain, Share2, ShieldCheck, Users } from 'lucide-react';
import { IntegrationsFeature } from '../integrations-feature';


import { AIAssistantDemo } from './features-items/AIAssistantDemo';
// import { CollaborationDemo } from './features-items/CollaborationDemo';
import { SecurityDemo } from './features-items/SecurityDemo';
import { TeamManagementDemo } from './features-items/TeamManagementDemo';

export const features = [
  {
    title: 'AI-Powered Meeting Assistant',
    description:
      'Automated meeting notes, transcription, and action item extraction powered by advanced AI technology.',
    icon: <Brain className="h-6 w-6" />,
    component: <AIAssistantDemo />,
  },
  {
    title: 'Multiplatform Support',
    description:
      'Support All major AI platforms, including ChatGPT, Claude, and DeepSeek.',
    icon: <Share2 className="h-6 w-6" />,
    component: <IntegrationsFeature />,
  },
  {
    title: 'Enterprise-Grade Security',
    description:
      'End-to-end encryption, waiting rooms, meeting locks, and admin controls to keep your meetings secure.',
    icon: <ShieldCheck className="h-6 w-6" />,
    component: <SecurityDemo />,
  },
  {
    title: 'Team Management',
    description:
      'Advanced user management, role-based permissions, and team analytics to optimize your communication.',
    icon: <Users className="h-6 w-6" />,
    component: <TeamManagementDemo />,
  },
];
