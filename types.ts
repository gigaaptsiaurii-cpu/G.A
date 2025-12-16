export enum SituationType {
    PRE_SESSION = 'PRE_SESSION',
    IN_TRADE_WIN = 'IN_TRADE_WIN',
    IN_TRADE_LOSS = 'IN_TRADE_LOSS',
    WAITING = 'WAITING',
    PHILOSOPHY = 'PHILOSOPHY',
    FINAL_TRUTH = 'FINAL_TRUTH'
}

export interface AdviceItem {
    id: string;
    type: SituationType;
    triggerText: string; // What the user clicks (e.g., "I just lost a trade")
    emoji: string;
    title: string;
    mainThought: string; // The core mindset shift
    actions: string[]; // Bullet points of what to do
    wrongThought?: string; // What NOT to think
    quote?: string; // A memorable phrase
}