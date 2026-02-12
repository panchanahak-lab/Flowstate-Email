export interface AISuggestion {
    id: string;
    type: 'subject' | 'starter' | 'signoff' | 'rewrite';
    content: string;
}

const MOCK_DELAY = 800;

export const aiService = {
    // Generate suggestions based on context overrides
    generateSuggestions: async (context: 'empty_subject' | 'empty_body' | 'general'): Promise<AISuggestion[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                switch (context) {
                    case 'empty_subject':
                        resolve([
                            { id: '1', type: 'subject', content: 'Updates regarding [Project]' },
                            { id: '2', type: 'subject', content: 'Meeting request: [Topic]' },
                            { id: '3', type: 'subject', content: 'Question about [Subject]' },
                        ]);
                        break;
                    case 'empty_body':
                        resolve([
                            { id: '4', type: 'starter', content: 'I hope this email finds you well.' },
                            { id: '5', type: 'starter', content: 'Just wanted to follow up on...' },
                            { id: '6', type: 'starter', content: 'Regarding our conversation earlier...' },
                        ]);
                        break;
                    default:
                        resolve([]);
                }
            }, MOCK_DELAY);
        });
    },

    rewriteText: async (_text: string, tone: number): Promise<string> => {
        // tone: -1 (Friendly) to 1 (Assertive)
        return new Promise((resolve) => {
            setTimeout(() => {
                if (tone < -0.3) return resolve("Hey there! Just wanted to quickly touch base on this. Let me know what you think!");
                if (tone > 0.3) return resolve("Please review the attached immediately. I expect feedback by EOD. Regards.");
                resolve("I am writing to share an update regarding the project. Please let me know your thoughts.");
            }, MOCK_DELAY);
        });
    },

    // New: Generate Draft from Prompt
    generateDraft: async (prompt: string): Promise<string> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Subject: Regarding ${prompt}\n\nHi there,\n\nI'm writing to you about ${prompt}. \n\nLooking forward to hearing from you.\n\nBest,\n[Your Name]`);
            }, MOCK_DELAY * 2);
        });
    }
};
